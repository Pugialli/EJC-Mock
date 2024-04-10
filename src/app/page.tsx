import { permanentRedirect } from 'next/navigation'

export default function Home() {
  async function redirectFromHome() {
    'use server'
    permanentRedirect('/login')
  }
  redirectFromHome()
}
