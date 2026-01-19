import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const redirectUrl = encodeURIComponent(url.pathname + url.search);

	if (!locals.session) {
		redirect(302, '/login?redirectUrl=' + redirectUrl);
	}
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
