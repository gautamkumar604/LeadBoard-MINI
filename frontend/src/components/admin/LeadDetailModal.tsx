import React from 'react';
import { Lead } from '@/types/lead';
import { Modal } from '../ui/Modal';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate } from '@/lib/utils';
import { Mail, User, Calendar, MessageSquare } from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <Modal isOpen={!!lead} onClose={onClose} title="Lead Record Details">
      <div className="space-y-6 text-sm">
        {/* Header Info */}
        <div className="flex items-center justify-between p-4 glass-card rounded-xl">
          <div>
            <h4 className="text-base font-bold text-white">{lead.name}</h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lead.email}</span>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        {/* Date Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
              Submitted Date
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(lead.createdAt)}
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
              Last Updated
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(lead.updatedAt)}
            </div>
          </div>
        </div>

        {/* Full Message */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Inquiry Message
          </span>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
            {lead.message}
          </div>
        </div>
      </div>
    </Modal>
  );
};
