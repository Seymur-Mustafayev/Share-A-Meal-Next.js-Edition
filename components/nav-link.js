'use client'
import Link from "next/link";
import clasess from '@/components/nav-link.module.css'
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }) {
    const path = usePathname()

    return (<Link href={href} className={path === href ? clasess.active : undefined}>
        {children}
    </Link>
    )
}
