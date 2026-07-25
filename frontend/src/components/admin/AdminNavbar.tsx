'use client';

import React from 'react';
import { Layers, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/Button';

interface AdminNavbarProps {
  onToggleSidebar?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">LeadDesk</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Admin Portal
            </span>
          </div>
        </div>

        {/* User Session Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">{user?.username || 'Admin User'}</p>
              <p className="text-[10px] text-slate-400">{user?.email || 'admin@leaddesk.com'}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="w-4 h-4 text-rose-400" />}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
