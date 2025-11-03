import clases from "@/components/header.module.css"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import HeaderBackground from "./header-background"
import NavLink from "./nav-link"
export default function Header() {
    return (
        <>
            <HeaderBackground />
            <header className={clases.header}>
                <Link href="/" className={clases.logo}>
                    <Image src={logo} alt="A plate with  food on it" priority />
                </Link>
                <nav className={clases.nav}>
                    <ul>
                        <li>
                           <NavLink href={'/meals'}>Browse Meals</NavLink>
                        </li>
                        <li>
                        <NavLink href={'/community'}>Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
