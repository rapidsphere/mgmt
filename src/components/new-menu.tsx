'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

interface MenuItem {
  label: string;
  href: string;
}

interface NewMenuProps {
  className?: string;
}

export function NewMenu({className}: NewMenuProps) {
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    {label: 'Dashboard', href: '/'},
    {label: 'Asset List', href: '/assets/list'},
    {label: 'Add Asset', href: '/assets/create'},
    {label: 'Check In', href: '/checkin'},
    {label: 'Check Out', href: '/checkout'},
    {label: 'Report', href: '/report'},
  ];

  return (
    <nav className={cn('bg-blue-100 p-4', className)}>
      <ul className="flex space-x-4">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'text-lg font-semibold hover:text-primary',
                pathname === item.href ? 'text-primary' : '',
                'hover:bg-red-200 p-2 rounded-md transition-colors'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
