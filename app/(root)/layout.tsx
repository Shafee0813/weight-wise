import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}

export default layout