import { Skeleton } from "./ui/skeleton";

const SkeletonWrapper = ({children, loading} : {children : React.ReactNode, loading : boolean}) => {
  if (!loading) return children;
    return (
    <Skeleton className='w-full h-full'>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  )
}

export default SkeletonWrapper