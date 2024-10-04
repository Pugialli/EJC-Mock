import {
  Blocks,
  CarFront,
  CircleParking,
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
      <Link href="/admin/externa">
        <NavItem
          title="Encontrista"
          icon={SquareUserRound}
          active={path === '/admin/externa'}
        />
      </Link>
      <Link href="/admin/externa/circulos">
        <NavItem
          title="Montagem de Círculos"
          icon={Puzzle}
          active={path === '/admin/externa/circulos'}
        />
      </Link>
      <NavItemGroup title="Tios de Externa" icon={CarFront}>
        {/* <Link href="/admin/externa/tios">
          <NavItem
            title="Lista de Tios"
            icon={Users}
            active={path === '/admin/externa/tios'}
          />
        </Link> */}
        <Link href="/admin/externa/alocacao-carros">
          <NavItem
            title="Alocação nos Carros"
            icon={Blocks}
            active={path === '/admin/externa/alocacao-carros'}
          />
        </Link>

        <Link href="/admin/externa/carros">
          <NavItem
            title="Lista de Carros"
            icon={CircleParking}
            active={path === '/admin/externa/carros'}
          />
        </Link>
      </NavItemGroup>
      <Link href="/admin/externa/pendencias">
        <NavItem
          title="Controle de Pendências"
          icon={ListChecks}
          active={path === '/admin/externa/pendencias'}
        />
      </Link>
      <Link href="/admin/externa/cartas">
        <NavItem
          title="Cartas"
          icon={Mail}
          active={path === '/admin/externa/cartas'}
        />
      </Link>
    </nav>
  )
}
