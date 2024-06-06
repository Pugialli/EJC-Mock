import igreja from '@/assets/Igreja.png'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { InfoMissa } from './(pageComponents)/InfoMissa'

export function Missa() {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-16 text-center lg:flex-row lg:px-20 lg:py-32 lg:text-start">
      <Image src={igreja} alt="Paróquia Nossa Senhora da Divina Providência" />
      <div className="flex flex-col gap-7 lg:gap-9">
        <h2 className="text-4xl font-bold text-violet-50">Missa dos Jovens</h2>
        <span className="text-lg text-violet-300">
          Participe com a gente da missa dos jovens com muita música e animação!
          Se quiser participar da Banda, venha ensaiar às 17h.
        </span>
        <div className="flex justify-center gap-8 pt-3 lg:justify-start">
          <InfoMissa text="Todos os domingos" icon={Calendar} />
          <InfoMissa text="18:00 Horas" icon={Clock} />
          <InfoMissa text="Na nossa paróquia" icon={MapPin} />
        </div>
      </div>
    </div>
  )
}
