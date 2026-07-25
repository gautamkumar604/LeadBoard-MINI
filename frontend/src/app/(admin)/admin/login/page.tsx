'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Layers, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { loginSchema, LoginInput } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@leaddesk.com',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      toast.success('Authentication Successful', {
        description: `Welcome back, ${response.user.username || response.user.email}! Redirecting to dashboard...`,
      });
      login(response.accessToken, response.user);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Invalid credentials provided. Please try again.';
      toast.error('Login Failed', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Back Link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Site
        </Link>
      </div>

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/25 mb-4">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal Login</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in with your seeded administrator account</p>
        </div>

        {/* Credentials Tip */}
        <div className="p-3 mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 text-center">
          <span className="font-semibold text-white">Default Credentials:</span> admin@leaddesk.com / Admin@123
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@leaddesk.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full mt-2"
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Authenticate Admin
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
