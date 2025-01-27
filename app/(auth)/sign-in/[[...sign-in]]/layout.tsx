import { ReactNode } from 'react'

const layout = ({children}  : {children: ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {children}
    </div>
  )
}

export default layout