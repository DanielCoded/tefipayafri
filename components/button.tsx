"use client"

import { clsx } from "@/lib/utils"
import type React from "react" // Import React

export function Button({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  [x: string]: any
}) {
  return (
    <button
      className={clsx(
        "flex w-full justify-center rounded-lg px-4 py-2 text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

