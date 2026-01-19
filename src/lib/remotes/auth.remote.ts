import { form, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.email({ error: 'Invalid email address' }),
	password: z.string().min(8, { error: 'Password must be at least 8 characters long' }),
	redirectUrl: z.string().optional(),
	rememberMe: z.boolean().optional()
});
const signupSchema = z.object({
	name: z.string().min(1, { error: 'Name is required' }),
	email: z.email({ error: 'Invalid email address' }),
	password: z.string().min(8, { error: 'Password must be at least 8 characters long' }),
	rememberMe: z.boolean().optional()
});

export const loginRemote = form(loginSchema, async (form, issue) => {
	const { locals } = getRequestEvent();
	try {
		await locals.auth.api.signInEmail({
			body: {
				...form
			}
		});
		console.log(form.redirectUrl);

		redirect(303, form.redirectUrl || '/');
	} catch (e) {
		throw e;
	}
});

export const signupRemote = form(signupSchema, async (form) => {
	const { locals } = getRequestEvent();
	try {
		await locals.auth.api.signUpEmail({
			body: {
				...form
			}
		});
		redirect(303, '/dashboard');
	} catch (e) {
		throw e;
	}
});

export const signOutRemote = form(async () => {
	const { locals, request } = getRequestEvent();
	await locals.auth.api.signOut({
		headers: request.headers
	});
	redirect(302, '/login');
});
