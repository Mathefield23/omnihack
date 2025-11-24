import clsx from 'clsx'
import React from 'react'

const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25',
  orange: 'bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25',
  amber: 'bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30',
  yellow: 'bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30',
  lime: 'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30',
  green: 'bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25',
  teal: 'bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30',
  sky: 'bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25',
  blue: 'bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25',
  indigo: 'bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25',
  violet: 'bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25',
  purple: 'bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25',
  fuchsia: 'bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25',
  pink: 'bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25',
  rose: 'bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20',
  'omnihack-primary': 'bg-[#1D506B]/15 text-[#1D506B] group-data-[hover]:bg-[#1D506B]/25',
  'omnihack-secondary': 'bg-[#C77B6A]/15 text-[#C77B6A] group-data-[hover]:bg-[#C77B6A]/25',
}

type BadgeProps = { color?: keyof typeof colors } & React.ComponentPropsWithoutRef<'span'>

export function Badge({ color = 'zinc', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
        colors[color]
      )}
    />
  )
}
