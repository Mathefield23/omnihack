import clsx from 'clsx'
import React from 'react'

export function Card({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-950/5 hover:shadow-lg transition-shadow'
      )}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'px-6 pt-6')}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={clsx(className, 'text-lg/6 font-semibold text-zinc-950 sm:text-base/6')}
    />
  )
}

export function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      className={clsx(className, 'mt-1 text-sm/6 text-zinc-500')}
    />
  )
}

export function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'px-6 pb-6')}
    />
  )
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'border-t border-zinc-950/5 px-6 py-4')}
    />
  )
}

export function CardBadge({ className, color, ...props }: React.ComponentPropsWithoutRef<'div'> & { color?: string }) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'absolute top-0 inset-x-0 h-1',
        color || 'bg-gradient-to-r from-omnihack-primary to-omnihack-secondary'
      )}
    />
  )
}
