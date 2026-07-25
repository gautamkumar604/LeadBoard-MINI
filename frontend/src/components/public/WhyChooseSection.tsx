'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';

const whyChooseReasons = [
  {
    icon: Zap,
    title: 'Instant Real-Time Sync',
    description:
      'Lead submissions immediately populate the admin dashboard state via automatic query cache invalidation.',
    highlight: 'Zero latency refresh',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description:
      'JWT Bearer tokens, salted bcrypt password hashing, and NestJS AuthGuards protect administrative data.',
    highlight: 'Production grade auth',
  },
  {
    icon: Layers,
    title: 'End-to-End Type Safety',
    description:
      'Shared Zod validation schemas and TypeScript DTOs eliminate runtime schema drift across layers.',
    highlight: 'Zod & NestJS Pipes',
  },
  {
    icon: RefreshCw,
    title: 'Decoupled SaaS Architecture',
    description:
      'Clean separation between Next.js 15 App Router frontend and NestJS MongoDB REST API service.',
    highlight: 'Scalable & Modular',
  },
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-400"
          >
            Why Choose LeadDesk Mini
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            Engineered for Precision Lead Acquisition
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            Discover why high-performing growth teams rely on LeadDesk Mini to capture, track, and process customer inquiries effortlessly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyChooseReasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-8 flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-indigo-300">
                      {item.highlight}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verified Production Pattern</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
