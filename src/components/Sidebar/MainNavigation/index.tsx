import {
  CarFront,
  ListChecks,
  Mail,
  Puzzle,
  SquareUserRound,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from './NavItem'
import { NavItemGroup } from './NavItemGroup'

export function MainNavigation() {
  const path = usePathname()

  return (
    <nav className="flex flex-col gap-4 space-y-0.5">
      <Link href="/externa">
        <NavItem
          title="Encontrista"
          icon={SquareUserRound}
          active={path === '/externa'}
        />
      </Link>
      <Link href="/externa/circulos">
        <NavItem
          title="Montagem de Círculos"
          icon={Puzzle}
          active={path === '/externa/circulos'}
        />
      </Link>
      <NavItemGroup title="Tios de Externa" icon={CarFront}>
        <Link href="/externa/tios">
          <NavItem
            title="Lista de Tios"
            icon={CarFront}
            active={path === '/externa/tios'}
          />
        </Link>
        <Link href="/externa/carros">
          <NavItem
            title="Alocação nos Carros"
            icon={CarFront}
            active={path === '/externa/carros'}
          />
        </Link>
      </NavItemGroup>
      <Link href="/externa/pendencias">
        <NavItem
          title="Controle de Pendências"
          icon={ListChecks}
          active={path === '/externa/pendencias'}
        />
      </Link>
      <Link href="/externa/cartas">
        <NavItem
          title="Cartas"
          icon={Mail}
          active={path === '/externa/cartas'}
        />
      </Link>
    </nav>
  )
}
