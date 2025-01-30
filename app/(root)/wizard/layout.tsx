const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-64px)] justify-center items-center px-3">
      {children}
    </div>
  )
}

export default layout