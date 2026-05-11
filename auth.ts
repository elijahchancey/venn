import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "@neondatabase/serverless"
import Reddit from "next-auth/providers/reddit"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Reddit({
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identity mysubreddits",
          duration: "permanent",
        },
      },
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "reddit" && user.id) {
        const redditProfile = profile as { name?: string }
        if (redditProfile?.name) {
          await pool.query(
            `UPDATE users SET reddit_username = $1 WHERE id = $2`,
            [redditProfile.name, user.id]
          )
        }
      }
    },
  },
})
