import { Armchair, Car, CarFront, Save } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EditNavItem } from './edit-nav-item'

export function EditNavigation() {
  const path = usePathname()

  return (
    <nav className="flex flex-col">
      <Link href="#car-section">
        <EditNavItem
          title="Carro"
          icon={Car}
          active={path === '#car-section'}
        />
      </Link>
      <Link href="#driver-section">
        <EditNavItem
          title="Motorista"
          icon={CarFront}
          active={path === '#driver-section'}
        />
      </Link>
      <Link href="#copilot-section">
        <EditNavItem
          title="Carona"
          icon={Armchair}
          active={path === '#copilot-section'}
        />
      </Link>
      <Link href="#save-section">
        <EditNavItem
          title="Salvar"
          icon={Save}
          active={path === '#save-section'}
        />
      </Link>
    </nav>
  )
}
