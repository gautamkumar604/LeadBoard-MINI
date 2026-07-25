'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { User, Mail, Send, CheckCircle2 } from 'lucide-react';
import { createLeadSchema, CreateLeadInput } from '@/schemas/lead.schema';
import { useSubmitLead } from '@/hooks/useLeads';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const LeadFormSection: React.FC = () => {
  const { mutateAsync: submitLead, isPending } = useSubmitLead();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: CreateLeadInput) => {
    try {
      await submitLead(data);
      toast.success('Thank you! Your lead request has been submitted successfully.', {
        description: 'Our team will review your message shortly.',
      });
      reset();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to submit lead request. Please try again.';
      toast.error('Submission Failed', {
        description: errorMessage,
      });
    }
  };

  return (
    <section id="lead-form" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Lead Growth?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Fill out the inquiry form and experience LeadDesk Mini in action. Your submission will immediately populate the live admin dashboard!
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Instant API Validation</h4>
                  <p className="text-xs text-slate-400">Backend class-validator pipes ensure clean lead records.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Real-Time Admin Sync</h4>
                  <p className="text-xs text-slate-400">TanStack Query state updates immediately in admin table.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Submit Lead Request</h3>
                <p className="text-xs text-slate-400 mt-1">All fields are validated with Zod & React Hook Form.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Full Name"
                  placeholder="e.g. Sarah Jenkins"
                  leftIcon={<User className="w-4 h-4" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. sarah@company.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Textarea
                  label="Message / Inquiry"
                  placeholder="Describe your lead requirements or inquiry..."
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button
                  type="submit"
                  isLoading={isPending}
                  size="lg"
                  className="w-full mt-2"
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Send Inquiry
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
