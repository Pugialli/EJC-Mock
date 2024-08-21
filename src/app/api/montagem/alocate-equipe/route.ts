import { NextResponse, type NextRequest } from 'next/server'
import { alocateEquipeMontagem, type changeEquipeProps } from './alocate-equipe'
import { deleteEquipeMontagem } from './delete-equipe-montagem'

export async function POST(request: NextRequest) {
  const updatedData: changeEquipeProps = await request.json()

  const equipeInfo =
    updatedData.valueEquipe !== 'select_equipe'
      ? await alocateEquipeMontagem(updatedData)
      : await deleteEquipeMontagem({ idEncontreiro: updatedData.idEncontreiro })

  if (!equipeInfo) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(equipeInfo, { status: 201 })
}
