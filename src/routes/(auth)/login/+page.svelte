<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		Field,
		FieldDescription,
		FieldError,
		FieldGroup,
		FieldLabel
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Spinner } from '$lib/components/ui/spinner';
	import { loginRemote } from '$lib/remotes/auth.remote';
	import { isHttpError } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	const id = $props.id();

	const { email, redirectUrl, password, rememberMe } = loginRemote.fields;
	const redirectUrlValue = page.url.searchParams.get('redirectUrl') || '/dashboard';
	redirectUrl.set(redirectUrlValue);
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			{...loginRemote.enhance(async ({ form, submit }) => {
				try {
					await submit();
					if (!loginRemote.fields.allIssues()) {
						toast.success('Logged in successfully');
						form.reset();
					}
				} catch (error) {
					if (isHttpError(error)) {
						toast.error(error.body.message);
					} else {
						toast.error('Something went wrong');
					}
				}
			})}
		>
			<FieldGroup>
				<Field>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input
						id="email-{id}"
						{...email.as('email')}
						placeholder="m@example.com"
						required
						autofocus
					/>
					{#each email.issues() as issue}
						<FieldError>{issue.message}</FieldError>
					{/each}
				</Field>
				<Field>
					<div class="flex items-center">
						<FieldLabel for="password-{id}">Password</FieldLabel>
						<a href="/forgot-password" class="ms-auto inline-block text-sm underline" tabindex="-1">
							Forgot your password?
						</a>
					</div>
					<Input
						id="password-{id}"
						{...password.as('password')}
						type="password"
						required
						placeholder="********"
					/>
					{#each password.issues() as issue}
						<FieldError>{issue.message}</FieldError>
					{/each}
				</Field>
				<Field orientation="horizontal">
					<Checkbox id="rememberMe-{id}" {...rememberMe.as('checkbox')} type="button" />
					<FieldLabel for="rememberMe-{id}">Remember me</FieldLabel>
				</Field>
				<input {...redirectUrl.as('text')} type="hidden" />
				<Field>
					<Button type="submit" class="w-full" disabled={!!loginRemote.pending}>
						{#if loginRemote.pending}
							<Spinner />
							Logging in...
						{:else}
							Login
						{/if}
					</Button>
					<Button variant="outline" class="w-full" disabled={true}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Login with Google
					</Button>
					<FieldDescription class="text-center">
						Don't have an account? <a href="/signup">Sign up</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
