

const Page = () => {
  return (
    <section className="w-screen h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="absolute inset-0 bg-black overflow-hidden -z-50">
  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ray-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-rose-600/30 dark:text-rose-800/20" stopColor="currentColor" />
          <stop offset="100%" className="text-transparent" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="ray-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className="text-rose-600/30 dark:text-rose-800/20" stopColor="currentColor" />
          <stop offset="100%" className="text-transparent" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <polygon points="0,0 100,0 50,100" fill="url(#ray-gradient-1)" />
      <polygon points="100,0 100,100 0,50" fill="url(#ray-gradient-2)" />
    </svg>
  </div>
</div>

      <div className="flex flex-col items-center">
        <h1 className="heading-text font-bold pb-3">Welcome to <span className='text-red-500 '>WeightWise. </span>👋 </h1>
        <p className="regular-text">Track your weight and progress with ease.</p>
      </div>
    </section>
  )
}

export default Page;