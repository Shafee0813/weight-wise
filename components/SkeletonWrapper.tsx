import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const SkeletonWrapper = ({children, loading, className} : {children : React.ReactNode, loading : boolean, className ?: string}) => {
  if (!loading) return children;
    return (
    <Skeleton className={cn("w-full h-full", className)}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  )
}

export default SkeletonWrapper