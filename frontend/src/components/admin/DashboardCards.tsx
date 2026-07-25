import React from 'react';
import { Users, UserPlus, PhoneCall, CheckCircle2, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/types/lead';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

interface DashboardCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-5">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads ?? 0,
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      badge: 'All Submissions',
    },
    {
      title: 'New Leads',
      value: stats?.newLeads ?? 0,
      icon: UserPlus,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      badge: 'Pending Review',
    },
    {
      title: 'Contacted',
      value: stats?.contactedLeads ?? 0,
      icon: PhoneCall,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      badge: 'In Progress',
    },
    {
      title: 'Closed',
      value: stats?.closedLeads ?? 0,
      icon: CheckCircle2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      badge: `${stats?.conversionRate ?? 0}% Conversion`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, idx) => (
        <Card key={idx} className="p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {card.title}
            </span>
            <div className={`p-2 rounded-xl border ${card.bg} ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {card.value}
            </span>
            <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
              {card.badge}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
