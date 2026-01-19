<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { signOutRemote } from '$lib/remotes/auth.remote';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Dashboard</h1>
<p>Welcome, {data.user.name}</p>
<form {...signOutRemote}>
	<Button type="submit" disabled={!!signOutRemote.pending}>Logout</Button>
</form>
