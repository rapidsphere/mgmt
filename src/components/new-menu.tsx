'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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
    {label: 'Check Out', href: '/checkout'},
    {label: 'Check In', href: '/checkin'},
    {label: 'Report', href: '/report'},
  ];

  return (
    <nav className={cn('bg-blue-100 p-4 flex justify-between items-center', className)}>
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

      {/* Profile Section */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://picsum.photos/50/50" alt="Profile" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Signed in as: yourname@example.com
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

