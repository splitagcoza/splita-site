import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign-in, embed provider details in the JWT
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      if (profile) {
        token.picture = (profile as { picture?: string; profile_image_url?: string }).picture
          ?? (profile as { picture?: string; profile_image_url?: string }).profile_image_url
          ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose safe fields to the client session
      session.user.id = token.sub ?? "";
      session.user.provider = token.provider as string | undefined;
      return session;
    },
  },
});
