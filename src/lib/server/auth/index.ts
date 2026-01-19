import { getRequestEvent } from '$app/server';
import { BETTER_AUTH_SECRET } from '$env/static/private';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';
import { type DB } from '$lib/server/db';
import { passkey } from '@better-auth/passkey';
import { sso } from '@better-auth/sso';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import {
	admin,
	anonymous,
	apiKey,
	bearer,
	emailOTP,
	genericOAuth,
	jwt,
	magicLink,
	multiSession,
	oAuthProxy,
	oneTap,
	openAPI,
	organization,
	phoneNumber,
	twoFactor,
	username
} from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const getAuth = (db: DB) =>
	betterAuth({
		database: drizzleAdapter(db, {
			provider: 'pg'
		}),
		appName: 'Girls Moments',
		baseURL: PUBLIC_BETTER_AUTH_URL,
		secret: BETTER_AUTH_SECRET,
		plugins: [
			jwt(),
			openAPI(),
			oAuthProxy(),
			// oauthProvider({
			// 	loginPage: '/sign-in-with-oauth',
			// 	consentPage: '/consent-with-oauth'
			// }),
			multiSession(),
			bearer(),
			sso(),
			// oidcProvider({
			// 	loginPage: '/sign-in-with-oidc'
			// }),
			organization(),
			admin(),
			apiKey(),
			oneTap(),
			genericOAuth({
				config: []
			}),
			passkey(),
			emailOTP({
				async sendVerificationOTP({ email, otp, type }, request) {
					// Send email with OTP
				}
			}),
			magicLink({
				sendMagicLink({ email, token, url }, request) {
					// Send email with magic link
				}
			}),
			phoneNumber(),
			anonymous(),
			username(),
			twoFactor(),
			sveltekitCookies(getRequestEvent)
		],
		// https://www.better-auth.com/docs/concepts/session-management#session-caching
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60 // 5 minutes
			}
		},

		// https://www.better-auth.com/docs/concepts/oauth
		// socialProviders: {
		// 	github: {
		// 		clientId: env.GITHUB_CLIENT_ID!,
		// 		clientSecret: env.GITHUB_CLIENT_SECRET!
		// 	},
		// 	google: {
		// 		clientId: env.GOOGLE_CLIENT_ID!,
		// 		clientSecret: env.GOOGLE_CLIENT_SECRET!
		// 	}
		// },

		// https://www.better-auth.com/docs/authentication/email-password
		emailAndPassword: {
			enabled: true
		},

		experimental: {
			// https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
			joins: true
		}
	});

export type Auth = ReturnType<typeof getAuth>;
export type Session = ReturnType<typeof getAuth>['$Infer']['Session']['session'];
export type User = ReturnType<typeof getAuth>['$Infer']['Session']['user'];
