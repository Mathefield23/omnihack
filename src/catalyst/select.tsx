import * as React from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

export function Select({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'select'>) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        'relative block w-full',
        'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:data-[focus]:ring-2 sm:after:data-[focus]:ring-omnihack-primary',
        'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none',
      ])}
    >
      <select
        {...props}
        className={clsx([
          'relative block w-full appearance-none rounded-lg py-[calc(theme(spacing[2.5])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
          'pl-[calc(theme(spacing[3.5])-1px)] pr-[calc(theme(spacing.10)-1px)] sm:pl-[calc(theme(spacing.3)-1px)] sm:pr-[calc(theme(spacing.9)-1px)]',
          'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6',
          'border border-zinc-950/10 data-[hover]:border-zinc-950/20',
          'bg-transparent',
          'focus:outline-none',
          'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500',
          'data-[disabled]:border-zinc-950/20',
          '*:text-black',
        ])}
      />
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon
          className="size-5 stroke-zinc-500 group-data-[disabled]:stroke-zinc-600 sm:size-4 forced-colors:stroke-[CanvasText]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>
    </span>
  )
}
