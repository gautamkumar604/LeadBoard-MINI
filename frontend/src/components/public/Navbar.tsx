'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">LeadDesk</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 ml-1">Mini</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Features
          </a>
          <a href="#lead-form" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Get Started
          </a>
          <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Architecture
          </a>
        </nav>

        {/* Admin Login Button */}
        <div className="flex items-center gap-4">
          <Link href="/admin/login">
            <Button variant="outline" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
              Admin Portal
            </Button>
          </Link>
          <a href="#lead-form" className="hidden sm:inline-block">
            <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
