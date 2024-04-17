import { loginData } from '@/app/(geral)/login/page'
import { UserCookieData } from '@/context/AuthContext'
import { api } from './axios'

export async function signInRequest(data: loginData) {
  const response = await api.post('/auth/singin', data)

  const responseUser: UserCookieData = response.data

  return {
    token: response.data.result.token,
    user: responseUser,
    // user: {
    //   name: 'João Paulo Pugialli',
    //   email: 'joao.pugialli@gmail.com.br',
    //   avatar: '571.jpg',
    // },
  }
}

export async function recoverUserInformation() {
  const user: UserCookieData = {
    name: 'João Paulo Pugialli',
    email: 'joao.pugialli@gmail.com.br',
    avatar: '571.jpg',
  }
  return { user }
}
