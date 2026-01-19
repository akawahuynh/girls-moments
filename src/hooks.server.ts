import { building } from '$app/environment';
import { getAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { APIError } from 'better-auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handleDbAndAuth: Handle = async ({ event, resolve }) => {
	const DATABASE_URL = event.platform?.env.DATABASE_URL;
	if (!DATABASE_URL) {
		throw Error('DATABASE_URL is not set');
	}
	event.locals.db = getDb(DATABASE_URL);
	event.locals.auth = getAuth(event.locals.db);

	return resolve(event);
};

export const handleAuth: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth.api.getSession({
		headers: event.request.headers
	});

	// Make session and user available on server
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth: event.locals.auth, building });
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log(error);

	if (error instanceof APIError) {
		return {
			message: error.message,
			status: error.statusCode
		};
	}
	return {
		message: message || 'Something went wrong',
		status: status || 500
	};
};

export const handle = sequence(handleDbAndAuth, handleAuth);
