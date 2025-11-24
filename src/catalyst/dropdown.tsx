import * as Headless from '@headlessui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export function Dropdown(props: Headless.MenuProps) {
  return <Headless.Menu {...props} />
}

export function DropdownButton<T extends React.ElementType = typeof Headless.MenuButton>({
  as = Headless.MenuButton,
  className,
  ...props
}: { className?: string } & Omit<Headless.MenuButtonProps<T>, 'className'>) {
  return (
    <Headless.MenuButton
      {...props}
      as={as}
      className={clsx(className, 'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-omnihack-primary')}
    />
  )
}

export function DropdownMenu({
  anchor = 'bottom end',
  className,
  ...props
}: { anchor?: Headless.MenuItemsProps['anchor']; className?: string } & Omit<Headless.MenuItemsProps, 'anchor' | 'className'>) {
  return (
    <Headless.Transition
      leave="duration-100 ease-in"
      leaveTo="opacity-0"
    >
      <Headless.MenuItems
        {...props}
        anchor={anchor}
        className={clsx(
          className,
          'isolate w-max rounded-xl p-1',
          'bg-white shadow-lg ring-1 ring-zinc-950/10',
          '[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:4px] data-[anchor~=end]:[--anchor-offset:-4px] sm:data-[anchor~=start]:[--anchor-offset:6px] sm:data-[anchor~=end]:[--anchor-offset:-6px]',
          'z-50'
        )}
      />
    </Headless.Transition>
  )
}

export function DropdownItem({ className, ...props }: { className?: string } & (
  | Omit<Headless.MenuItemProps<'button'>, 'as' | 'className'>
  | (Omit<Headless.MenuItemProps<typeof Link>, 'as' | 'className'> & { href: string })
)) {
  const classes = clsx(
    className,
    'group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5',
    'flex w-full items-center gap-3',
    'data-[focus]:bg-omnihack-primary/10',
    'data-[slot=icon]:*:size-5 data-[slot=icon]:*:shrink-0 sm:data-[slot=icon]:*:size-4',
    'data-[slot=icon]:*:fill-zinc-500 data-[slot=icon]:*:group-data-[focus]:fill-omnihack-primary',
    'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-6 sm:data-[slot=avatar]:*:size-5',
    'text-left text-base/6 text-zinc-950 sm:text-sm/6 forced-colors:text-[CanvasText]'
  )

  return 'href' in props ? (
    <Headless.MenuItem as={Link} {...props} to={props.href} className={classes} />
  ) : (
    <Headless.MenuItem as="button" {...props} className={classes} />
  )
}

export function DropdownLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'truncate')} />
}

export function DropdownDivider({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'my-1 h-px bg-zinc-950/5 forced-colors:bg-[CanvasText]')}
    />
  )
}

export function DropdownHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'px-3.5 pb-1 pt-2.5 sm:px-3')}
    />
  )
}

export function DropdownSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(className, 'p-1')}
    />
  )
}
