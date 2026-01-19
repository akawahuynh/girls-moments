import type { auth } from '$lib/server/auth';
import { createAuthClient } from 'better-auth/client';
import {
	adminClient,
	anonymousClient,
	apiKeyClient,
	emailOTPClient,
	genericOAuthClient,
	inferAdditionalFields,
	magicLinkClient,
	multiSessionClient,
	oauthProviderClient,
	oauthProviderResourceClient,
	oidcClient,
	oneTapClient,
	organizationClient,
	passkeyClient,
	phoneNumberClient,
	ssoClient,
	twoFactorClient,
	usernameClient
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000',
	plugins: [
		inferAdditionalFields<typeof auth>(),
		twoFactorClient(),
		usernameClient(),
		anonymousClient(),
		phoneNumberClient(),
		magicLinkClient(),
		emailOTPClient(),
		passkeyClient(),
		genericOAuthClient(),
		oneTapClient({ clientId: 'MY_CLIENT_ID' }),
		apiKeyClient(),
		adminClient(),
		organizationClient(),
		oidcClient(),
		ssoClient(),
		multiSessionClient(),
		oauthProviderClient(),
		oauthProviderResourceClient()
	]
});
