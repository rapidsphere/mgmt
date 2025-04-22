'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

export function NewMenu() {
  const pathname = usePathname();
  const menuItems = [
    {label: 'Dashboard', href: '/'},
    {label: 'Asset List', href: '/assets/list'},
    {label: 'Add Asset', href: '/assets/create'},
    {label: 'Check In', href: '/checkin'},
    {label: 'Check Out', href: '/checkout'},
    {label: 'Report', href: '/report'},
  ];

  return (
    <nav className="bg-secondary p-4">
      <ul className="flex space-x-4">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-lg font-semibold hover:text-primary ${
                pathname === item.href ? 'text-primary' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
