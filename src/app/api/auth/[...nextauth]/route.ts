import { authOptions } from '@/lib/auth/auth-options'
import NextAuth from 'next-auth'

// const nextAuthOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const response = await fetch(
//           // 'https://site-ejc.vercel.app/api/auth/singinRequest',
//           'http://localhost:3000/api/auth/singinRequest',
//           {
//             method: 'POST',
//             headers: {
//               'Content-type': 'application/json',
//             },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//           },
//         )

//         const user = await response.json()

//         if (user && response.ok) {
//           return user
//         }

//         return null

//         // return (
//         //   api
//         //     .post('auth/singinRequest', {
//         //       email: credentials?.email,
//         //       password: credentials?.password,
//         //     })
//         //     .then((response) => {
//         //       console.log(response)
//         //       return response.data
//         //     })
//         //     .catch((error: AxiosError) => {
//         //       console.log(error.cause)
//         //       return null
//         //     }) || null
//         // )
//         // try {
//         //   const response = await api.post('auth/singinRequest', credentials)
//         //   const user = await response.data

//         //   console.log(response)
//         //   console.log(user)

//         //   if (response && user) {
//         //     console.log('Response:', response)
//         //     console.log('User:', user)
//         //     return user
//         //   }
//         //   return null
//         // } catch {
//         //   return null
//         // }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       user && (token.user = user)
//       return token
//     },
//     async session({ session, token }) {
//       session = token.user as Session
//       return session
//     },
//   },
// }

// const handler = NextAuth(nextAuthOptions)

// export { handler as GET, handler as POST, nextAuthOptions }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// eslint-disable-next-line prettier/prettier

