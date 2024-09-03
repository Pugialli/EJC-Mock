import {
  Bed,
  Building2,
  Clipboard,
  ClipboardCheck,
  FileHeart,
  Save,
  User,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EditNavItem } from './edit-nav-item'

export function EditNavigation() {
  const path = usePathname()

  return (
    <nav className="flex flex-col">
      <Link href="#personal-section">
        <EditNavItem
          title="Dados Pessoais"
          icon={User}
          active={path === '#personal-section'}
        />
      </Link>
      <Link href="#address-section">
        <EditNavItem
          title="Endereço"
          icon={Building2}
          active={path === '#address-section'}
        />
      </Link>
      <Link href="#address-encontro-section">
        <EditNavItem
          title="Endereço Encontro"
          icon={Bed}
          active={path === '#address-encontro-section'}
        />
      </Link>
      <Link href="#family-section">
        <EditNavItem
          title="Família"
          icon={Users}
          active={path === '#family-section'}
        />
      </Link>
      <Link href="#nomination-section">
        <EditNavItem
          title="Indicação"
          icon={FileHeart}
          active={path === '#nomination-section'}
        />
      </Link>
      <Link href="#other-section">
        <EditNavItem
          title="Outros"
          icon={Clipboard}
          active={path === '#other-section'}
        />
      </Link>
      <Link href="#externa-section">
        <EditNavItem
          title="Informações Extras"
          icon={ClipboardCheck}
          active={path === '#externa-section'}
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
