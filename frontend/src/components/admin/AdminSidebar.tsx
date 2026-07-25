'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Lead Management',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/admin/dashboard',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 p-4 transition-transform duration-300 md:translate-x-0 flex flex-col justify-between',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="space-y-6">
          <div className="px-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Navigation</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200',
                  item.active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800',
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* System Info Box */}
        <div className="p-3 glass-card rounded-xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MongoDB Atlas Connected
          </div>
          <p className="text-[11px] text-slate-400">Environment: Production Build</p>
        </div>
      </aside>
    </>
  );
};
