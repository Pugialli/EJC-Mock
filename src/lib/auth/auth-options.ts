import { NextAuthOptions, Session } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from './prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          'https://site-ejc.vercel.app/api/auth/singinRequest',
          // 'http://localhost:3000/api/auth/singinRequest',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        )

        const user = await response.json()

        if (user && response.ok) {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session = token.user as Session
      return session
    },
  },
}
