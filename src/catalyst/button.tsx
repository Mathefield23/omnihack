import * as React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const styles = {
  base: [
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold',
    'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2',
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)]',
    'before:shadow',
    'disabled:opacity-50',
    'forced-colors:outline',
  ],
  solid: [
    'border-transparent',
    'before:bg-[--btn-bg]',
    'hover:before:bg-[--btn-hover-overlay]',
    'active:before:bg-[--btn-hover-overlay] active:before:opacity-80',
  ],
  outline: [
    'border-zinc-950/10',
    'bg-transparent',
    'hover:bg-zinc-950/2.5',
    'active:bg-zinc-950/5',
  ],
  plain: [
    'border-transparent',
    'hover:bg-zinc-950/5',
    'active:bg-zinc-950/10',
  ],
  colors: {
    'omnihack-primary': {
      solid:
        'text-white [--btn-bg:theme(colors.omnihack.primary)] [--btn-hover-overlay:theme(colors.omnihack.accent)] data-[focus]:outline-omnihack-primary',
      outline:
        'text-omnihack-primary hover:text-omnihack-accent border-omnihack-primary/50 data-[active]:bg-omnihack-primary/5 data-[hover]:bg-omnihack-primary/5',
      plain:
        'text-omnihack-primary data-[active]:bg-omnihack-primary/5 data-[hover]:bg-omnihack-primary/5',
    },
    'omnihack-secondary': {
      solid:
        'text-white [--btn-bg:theme(colors.omnihack.secondary)] [--btn-hover-overlay:theme(colors.omnihack.gold)] data-[focus]:outline-omnihack-secondary',
      outline:
        'text-omnihack-secondary border-omnihack-secondary/50 data-[active]:bg-omnihack-secondary/5 data-[hover]:bg-omnihack-secondary/5',
      plain:
        'text-omnihack-secondary data-[active]:bg-omnihack-secondary/5 data-[hover]:bg-omnihack-secondary/5',
    },
    dark: {
      solid: 'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-hover-overlay:theme(colors.white/10%)] data-[focus]:outline-white/20',
      outline: 'text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5',
      plain: 'text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5',
    },
    light: {
      solid: 'text-zinc-950 [--btn-bg:white] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[focus]:outline-white data-[disabled]:bg-zinc-950/5 data-[hover]:before:shadow-sm',
      outline: 'text-white hover:text-white border-white/50 data-[active]:bg-white/5 data-[hover]:bg-white/5',
      plain: 'text-white data-[active]:bg-white/10 data-[hover]:bg-white/10',
    },
    red: {
      solid: 'text-white [--btn-bg:theme(colors.red.600)] [--btn-hover-overlay:theme(colors.white/10%)] data-[focus]:outline-red-600',
      outline: 'text-red-600 border-red-600/50 data-[active]:bg-red-600/5 data-[hover]:bg-red-600/5',
      plain: 'text-red-600 data-[active]:bg-red-600/5 data-[hover]:bg-red-600/5',
    },
  },
}

type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: keyof typeof styles.colors; outline: true; plain?: never }
  | { color?: keyof typeof styles.colors; outline?: never; plain: true }
) & { className?: string } & (
    | React.ComponentPropsWithoutRef<'button'>
    | (React.ComponentPropsWithoutRef<typeof Link> & { href: string })
  )

export function Button({
  color = 'omnihack-primary',
  outline,
  plain,
  className,
  ...props
}: ButtonProps) {
  const variant = outline ? 'outline' : plain ? 'plain' : 'solid'
  const variantStyles = clsx(
    styles.base,
    styles[variant],
    styles.colors[color][variant]
  )

  return 'href' in props ? (
    <Link
      {...props}
      to={props.href}
      className={clsx(className, variantStyles, 'px-3.5 py-2.5 sm:px-3.5 sm:py-2.5 sm:text-sm/6')}
    />
  ) : (
    <button
      {...props}
      className={clsx(className, variantStyles, 'px-3.5 py-2.5 sm:px-3.5 sm:py-2.5 sm:text-sm/6')}
    />
  )
}
