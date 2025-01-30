"use client"

import React from 'react'
import {ThemeToggle} from './ThemeToggle';
import { UserButton } from '@clerk/nextjs';
import { DesktopLogo, MobileLogo } from './Logo';
import { Button, buttonVariants } from "@/components/ui/button"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react';


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
    <nav className='flex justify-between items-center h-16 border-b-2 px-4 sm:hidden'>
      <div className="flex items-center space-x-4">
        <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon"  aria-label="Open menu" ><MenuIcon/></Button>
        </SheetTrigger>
        <SheetContent side={"left"} className='w-80'>
          <SheetTitle className='pb-6'><DesktopLogo/></SheetTitle>
          <SheetDescription>
            {navbarItems.map((item, index)=> (        
              <div className="py-3" key = {index}>
              <NavbarLink  href={item.href} label={item.label} />
              </div>
            ))}
          </SheetDescription>
        </SheetContent>
        </Sheet>
        <MobileLogo />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  )
}

const DesktopNavbar = () => {

  return (
    <nav className='hidden justify-between items-center h-16 border-b-2 px-10 max-md:px-4 sm:flex'>
      <div className="flex justify-center items-center space-x-2 relative">
      <DesktopLogo />
      {navbarItems.map((item, index) => (
        <NavbarLink key = {index} href={item.href} label={item.label} />
      ))}
      </div>
      <div className='flex items-center space-x-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
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