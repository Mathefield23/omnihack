import * as Headless from '@headlessui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      {...props}
      className={clsx(className, 'flex flex-1 items-center gap-4 py-2.5')}
    />
  )
}

export function NavbarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, 'h-6 w-px bg-zinc-950/10')}
    />
  )
}

export function NavbarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'flex items-center gap-3')} />
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, '-ml-4 flex-1')}
    />
  )
}

export const NavbarItem = React.forwardRef(function NavbarItem(
  { current, className, children, ...props }: { current?: boolean; className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, 'as' | 'className'>
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const classes = clsx(
    'relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5',
    'data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5',
    'data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4',
    'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6',
    'data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950',
    'data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950',
    'data-[slot=icon]:*:data-[current]:fill-omnihack-primary',
    current && 'bg-zinc-950/5 data-[slot=icon]:*:fill-omnihack-primary'
  )

  return 'href' in props ? (
    <Headless.CloseButton as={React.Fragment} ref={ref}>
      <Link {...props} to={props.href} className={clsx(className, classes)} data-current={current ? 'true' : undefined}>
        <span className="absolute inset-0" />
        {children}
      </Link>
    </Headless.CloseButton>
  ) : (
    <Headless.Button
      {...props}
      className={clsx(className, classes)}
      data-current={current ? 'true' : undefined}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      <span className="absolute inset-0" />
      {children}
    </Headless.Button>
  )
})

export function NavbarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'truncate')} />
}
