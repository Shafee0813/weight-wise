

import React from 'react'
import {ThemeToggle} from './ThemeToggle';
import { UserButton } from '@clerk/nextjs';

const navbarItems = [ 
  {link : "About", href: "/"},
  {link : "Dashboard", href: "/dashboard"},
  {link : "Exercises", href: "/exercises"}, 
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
    DesktopNavbar
    
    <div className='flex items-center space-x-4'>
      <ThemeToggle />
      <UserButton />
    </div>
  </div>
  )
}

export default Navbar