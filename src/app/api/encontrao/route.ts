import { NextResponse } from 'next/server'

export type EncontraoData = {
  dataInicio: Date
}
export async function GET() {
  // if (req.method !== 'GET') {
  //   return res.status(405).end()
  // }

  // const { name, username } = req.body

  // const userExists = await prisma.user.findUnique({
  //   where: {
  //     username,
  //   },
  // })

  // if (userExists) {
  //   return res.status(400).json({
  //     message: 'Username already taken.',
  //   })
  // }

  // const user = await prisma.user.create({
  //   data: {
  //     name,
  //     username,
  //   },
  // })

  // setCookie({ res }, '@ignitecall:userID', user.id, {
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: '/',
  // })

  const dataEncontro = new Date('05/24/2024')

  const data: EncontraoData = { dataInicio: dataEncontro }
  return NextResponse.json(data)
}
