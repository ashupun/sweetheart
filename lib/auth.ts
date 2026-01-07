import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./db/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: "sweetheart <noreply@sweethe.art>",
        to: user.email,
        subject: "reset your password ♡",
        html: `
          <div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; color: #1a1a1a; margin-bottom: 20px;">hey ${user.name} 💕</h1>
            <p style="color: #666; margin-bottom: 30px;">click below to reset your password:</p>
            <a href="${url}" style="display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 14px;">reset password ↗</a>
            <p style="color: #999; font-size: 12px; margin-top: 40px;">if you didn't request this, just ignore this email.</p>
          </div>
        `,
      });
      if (error) {
        console.error("Resend error:", error);
        throw new Error(error.message);
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const verifyUrl = new URL(url);
      verifyUrl.searchParams.set("callbackURL", "/dashboard");
      const { data, error } = await resend.emails.send({
        from: "sweetheart <noreply@sweethe.art>",
        to: user.email,
        subject: "verify your email ♡",
        html: `
          <div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; color: #1a1a1a; margin-bottom: 20px;">hey ${user.name} 💕</h1>
            <p style="color: #666; margin-bottom: 30px;">click below to verify your sweetheart account:</p>
            <a href="${verifyUrl.toString()}" style="display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 14px;">verify email ↗</a>
            <p style="color: #999; font-size: 12px; margin-top: 40px;">if you didn't create this account, just ignore this email.</p>
          </div>
        `,
      });
      if (error) {
        console.error("Resend error:", error);
        throw new Error(error.message);
      }
      console.log("Email sent:", data);
    },
    autoSignInAfterVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
