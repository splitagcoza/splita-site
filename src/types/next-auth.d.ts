// Augment the built-in Auth.js session/JWT types with SPLITA-specific fields
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"];
    /** JWT issued by the SPLITA Go backend after /api/v1/auth/sync */
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    providerAccountId?: string;
    /** JWT issued by the SPLITA Go backend after /api/v1/auth/sync */
    backendToken?: string;
  }
}
