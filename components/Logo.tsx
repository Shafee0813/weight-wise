import { BicepsFlexed } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <BicepsFlexed className="stroke h-11 w-11 stroke-rose-600 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-rose-700 to-rose-800 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        WeightWise
      </p>
    </Link>
  );
}

export default Logo;
