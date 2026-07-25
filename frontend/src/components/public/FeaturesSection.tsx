'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, Filter, Lock, Database } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  {
    icon: Zap,
    title: 'Instant Lead Capture',
    description: 'Public lead intake form with React Hook Form and Zod client validation for zero latency.',
  },
  {
    icon: Lock,
    title: 'JWT Bearer Security',
    description: 'Protected admin dashboard backed by NestJS AuthGuard and bcrypt password security.',
  },
  {
    icon: Search,
    title: 'Full-Text Lead Search',
    description: 'MongoDB text indexes enabling instant multi-field query searching across lead names and emails.',
  },
  {
    icon: Filter,
    title: 'Status Workflow',
    description: 'Track leads through lifecycle states: New, Contacted, and Closed with instant updates.',
  },
  {
    icon: Database,
    title: 'Mongoose & Repository Pattern',
    description: 'Clean backend architecture isolating domain business rules from database query code.',
  },
  {
    icon: Shield,
    title: 'Production Security',
    description: 'Helmet security headers, rate limiting throttler, and global request validation pipes.',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-900/40 relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-400"
          >
            Enterprise Feature Suite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Built for Modern Lead Management
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base"
          >
            Every layer engineered following production best practices from NestJS backend to Next.js 15 App Router frontend.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group hover:-translate-y-1 transition duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
