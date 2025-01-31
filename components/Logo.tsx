import { BicepsFlexed } from "lucide-react";
import Link from "next/link";
import React from "react";

export function DesktopLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <BicepsFlexed className="stroke h-9 w-9 stroke-rose-600 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-rose-700 to-rose-800 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent">
        WeightWise
      </p>
    </Link>
  );
}

export function MobileLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <BicepsFlexed className="stroke h-8 w-8 stroke-rose-600 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-rose-700 to-rose-800 bg-clip-text text-xl font-bold leading-tight tracking-tighter text-transparent">
        WeightWise
      </p>
    </Link>
  );
}

export function LoadingLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 motion-scale-in-[0.5] motion-blur-in-[30px] motion-duration-[1.00s]/blur">
      <BicepsFlexed className="stroke h-9 w-9 stroke-rose-600 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-rose-700 to-rose-800 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent">
        WeightWise
      </p>
    </Link>
  )
}


