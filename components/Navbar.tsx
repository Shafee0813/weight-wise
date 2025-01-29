"use client"

import React from 'react'
import {ThemeToggle} from './ThemeToggle';
import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navbarItems = [ 
  {label : "About", href: "/"},
  {label : "Dashboard", href: "/dashboard"},
  {label : "Exercises", href: "/exercises"}, 
]

const Navbar = () => {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  )
}

const MobileNavbar = () => {
  return (
    <div className='flex sm:hidden'>Mobile</div>
  )
}

const DesktopNavbar = () => {

  return (
    <div className='hidden justify-between items-center h-16 border-b-2 px-10 max-md:px-4 sm:flex'>
      <div className="flex justify-center items-center space-x-2 relative">
      <Logo />
      {navbarItems.map((item, index) => (
        <NavbarLink key = {index} href={item.href} label={item.label} />
      ))}
      </div>
      <div className='flex items-center space-x-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  )
}

const NavbarLink = ({href, label} : {href: string, label: string}) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <div className="relative items-center">
      <Link href={href} className={cn(buttonVariants({ variant: "ghost" }), isActive ? "text-primary" : "text-muted-foreground")}>
      {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[15px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground sm:block"></div>
      )}

    </div>

  )
}

export default Navbar