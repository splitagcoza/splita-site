import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign-in: sync with SPLITA backend to get an API token
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.splita.co.za";
          const serviceToken = process.env.INTERNAL_SERVICE_SECRET;
          const res = await fetch(`${apiUrl}/api/v1/auth/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(serviceToken ? { "X-Service-Token": serviceToken } : {}),
            },
            body: JSON.stringify({
              provider: account.provider,
              provider_account_id: account.providerAccountId,
              email: token.email,
              name: token.name,
              avatar_url: token.picture,
              email_verified: (profile as { email_verified?: boolean })?.email_verified ?? false,
            }),
          });
          if (res.ok) {
            const json = await res.json();
            token.backendToken = json?.data?.token as string | undefined;
          }
        } catch {
          // Backend unavailable - sign-in still succeeds, API calls will fail until resolved
        }
      }
      if (profile) {
        token.picture =
          (profile as { picture?: string }).picture ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.provider = token.provider as string | undefined;
      session.backendToken = token.backendToken as string | undefined;
      return session;
    },
  },
});
