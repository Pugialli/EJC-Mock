import {
  CarFront,
  ListChecks,
  Mail,
  Puzzle,
  SquareUserRound,
} from 'lucide-react'
import Link from 'next/link'
import { NavItem } from './NavItem'
import { NavItemGroup } from './NavItemGroup'

export function MainNavigation() {
  return (
    <nav className="space-y-0.5">
      <Link href="/externa">
        <NavItem title="Encontrista" icon={SquareUserRound} />
      </Link>
      <Link href="/externa/circulos">
        <NavItem title="Montagem de Círculos" icon={Puzzle} />
      </Link>
      <NavItemGroup title="Tios de Externa" icon={CarFront}>
        <Link href="/externa/tios">
          <NavItem title="Lista de Tios" icon={CarFront} />
        </Link>
        <Link href="/externa/carros">
          <NavItem title="Alocação nos Carros" icon={CarFront} />
        </Link>
      </NavItemGroup>
      <Link href="/externa/pendencias">
        <NavItem title="Controle de Pendências" icon={ListChecks} />
      </Link>
      <Link href="/externa/cartas">
        <NavItem title="Cartas" icon={Mail} />
      </Link>
    </nav>
  )
}
