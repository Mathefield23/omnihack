import { ReactNode } from 'react';
import clsx from 'clsx';

export function Table({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className={clsx('min-w-full divide-y divide-zinc-200', className)}>
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-zinc-50">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-zinc-200 bg-white">{children}</tbody>;
}

export function TableRow({ className, children }: { className?: string; children: ReactNode }) {
  return <tr className={className}>{children}</tr>;
}

export function TableHeader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <th
      scope="col"
      className={clsx(
        'px-3 py-3.5 text-left text-sm font-semibold text-zinc-900',
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <td className={clsx('whitespace-nowrap px-3 py-4 text-sm text-zinc-500', className)}>
      {children}
    </td>
  );
}
