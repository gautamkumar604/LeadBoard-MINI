import React from 'react';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white">LeadDesk Mini</span>
        </div>

        <p className="text-xs text-slate-500 text-center sm:text-left">
          Production Internship Assessment Build • Next.js 15 & NestJS Framework Architecture
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#lead-form" className="hover:text-white transition">Submit Lead</a>
          <a href="/admin/login" className="hover:text-white transition">Admin Portal</a>
        </div>
      </div>
    </footer>
  );
};
