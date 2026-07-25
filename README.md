# 🚀 LeadDesk Mini

> **LeadDesk Mini** is a full-stack, enterprise-grade Lead Management Web Application built with **Next.js 15 (App Router)** on the frontend and **NestJS (TypeScript)** with **MongoDB Atlas** on the backend. Designed for speed, real-time query state synchronization, high security, and exceptional user experience.

---

## 🌟 Key Features

### 🏢 Public-Facing Portal
- **High-Converting Landing Page**: Modern glassmorphism UI with responsive design, hero animations, feature highlights, and interactive test drive modals.
- **Instant Lead Submission Form**: Built using **React Hook Form** + **Zod** schema validation for instant client-side error feedback.
- **Automated Real-Time Cache Invalidation**: Submitting a lead automatically invalidates TanStack Query caches, refreshing the admin dashboard immediately upon login without page reloads.

### 🛡️ Secure Admin Portal
- **JWT Authentication & Authorization**: Salted `bcrypt` password hashing, stateless JWT Bearer Token authorization with `NestJS AuthGuard`.
- **Automated Database Seeding**: Pre-configured `npm run seed` command to bootstrap default admin credentials (`admin@leaddesk.com`).
- **Interactive Lead Dashboard**: Key metrics summary cards (Total Leads, New, Contacted, Converted, Conversion Rate %).
- **Advanced Lead Table**: Real-time filtering by status (`NEW`, `CONTACTED`, `QUALIFIED`, `LOST`), instant keyword search across lead name/email/company, and inline status modification.
- **CSV Export**: One-click lead database export to CSV for external CRM importing.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: Next.js 15 (App Router, React 18, Server/Client components)
- **State Management & Caching**: TanStack Query v5 (`@tanstack/react-query`)
- **Form Handling & Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS with custom glassmorphism design system
- **UI Components & Icons**: Lucide React + Sonner (Toast notifications)
- **HTTP Client**: Axios with request/response interceptors for JWT injection and 401 handling

### **Backend**
- **Framework**: NestJS 10 (TypeScript, Modular Architecture)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Security**: Passport JWT, Bcrypt, Helmet (HTTP Headers Protection), Throttler (Rate Limiting)
- **Optimization**: Payload Compression, Global Validation Pipe, Global Interceptors & Exception Filters
- **Health Monitoring**: Dedicated `/api/health` endpoint

---

## 📁 Repository Folder Structure

```
leadDesk/
├── frontend/                     # Next.js 15 Client Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router (Public & (admin) Routes)
│   │   │   ├── (admin)/          # Protected Admin Portal Routes (/admin/login, /admin/dashboard)
│   │   │   ├── layout.tsx        # Root HTML Layout & Query/Auth Providers
│   │   │   └── page.tsx          # Public Landing Page
│   │   ├── components/           # Reusable UI Components
│   │   │   ├── admin/            # Dashboard Cards, Lead Table, Status Badge
│   │   │   ├── public/           # Hero, Navbar, Lead Form Modal, Why Choose Section
│   │   │   └── ui/               # Base UI (Button, Input, Card, Modal)
│   │   ├── context/              # Auth Context & State Management
│   │   ├── hooks/                # Custom React Hooks (useAuth, useLeads)
│   │   ├── lib/                  # Axios API Client instance
│   │   ├── schemas/              # Zod validation schemas
│   │   ├── services/             # API Service layer (Auth, Leads)
│   │   └── types/                # TypeScript Interfaces & Types
│   ├── .env.example              # Frontend Environment Template
│   ├── package.json              # Frontend Dependencies
│   └── vercel.json               # Vercel Deployment Configuration
│
└── backend/                      # NestJS REST API Application
    ├── src/
    │   ├── common/               # Global Interceptors, Filters, Middleware
    │   ├── config/               # Environment Configuration Loader
    │   ├── database/             # Mongoose Base Repository & Database Seeder
    │   ├── modules/              # Feature Modules (Auth, Leads, Users, Health)
    │   │   ├── auth/             # JWT Strategy, Guards, Controllers & Services
    │   │   ├── health/           # Health Check Controller
    │   │   ├── leads/            # Leads Module, Repository, Controller & Services
    │   │   └── users/            # Users Module, Schema, Repository & Services
    │   ├── app.module.ts         # Main Application Module
    │   └── main.ts               # NestJS Entrypoint (Global Pipes, Guards, Cors)
    ├── .env.example              # Backend Environment Template
    ├── package.json              # Backend Dependencies & Scripts
    └── render.yaml               # Render Cloud Deployment Blueprint
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.x or v20.x
- **MongoDB**: Local MongoDB instance (e.g. `mongodb://localhost:27017/leaddesk`) OR MongoDB Atlas URL.

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/leaddesk
JWT_SECRET=super-secret-jwt-key-leaddesk-mini-2026
JWT_EXPIRATION=1d
FRONTEND_URL=http://localhost:3000
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

Seed the default Admin User:
```bash
npm run seed
```
> **Default Admin Credentials:** `admin@leaddesk.com` / `Admin@123`

Start Backend Server:
```bash
npm run start:dev
```
Backend API runs at: `http://localhost:5000/api`

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start Frontend Dev Server:
```bash
npm run dev
```
Frontend runs at: `http://localhost:3000`

---

## 📡 API Specifications & Endpoints

### **Health Check**
- `GET /api/health` — Public endpoint returning service uptime and timestamp.

### **Authentication**
- `POST /api/auth/login` — Public endpoint to authenticate admin users.
  - **Body**: `{ "email": "admin@leaddesk.com", "password": "Admin@123" }`
  - **Response**: `{ "success": true, "data": { "accessToken": "...", "user": { ... } } }`
- `GET /api/auth/me` — Protected endpoint (Requires Bearer Token) returning current admin session.

### **Leads Management**
- `POST /api/leads` — Public endpoint to capture new leads from landing page.
  - **Body**: `{ "name": "John Doe", "email": "john@example.com", "phone": "+1234567890", "company": "Acme Inc", "message": "Interested" }`
- `GET /api/leads` — Protected admin endpoint to fetch all leads (supports query params: `search`, `status`, `page`, `limit`).
- `GET /api/leads/stats` — Protected admin endpoint returning lead counter metrics.
- `GET /api/leads/:id` — Protected admin endpoint to fetch single lead.
- `PATCH /api/leads/:id/status` — Protected admin endpoint to update lead status (`NEW`, `CONTACTED`, `QUALIFIED`, `LOST`).
- `DELETE /api/leads/:id` — Protected admin endpoint to delete a lead.

---

## 🌐 Production Deployment Guide

### **Deploy Backend to Render**
1. Push project to GitHub.
2. Log into [Render Dashboard](https://render.com) and create a **New Web Service**.
3. Select your repository and specify `backend` as the root directory.
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `npm run start:prod`
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<Your_MongoDB_Atlas_Connection_String>`
   - `JWT_SECRET`: `<Strong_Random_Secret>`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
7. Render will automatically use `/api/health` for health checks.

### **Deploy Frontend to Vercel**
1. Log into [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
2. Select your repository and set `frontend` as the root directory.
3. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend.onrender.com/api`
4. Click **Deploy**.

---

## 🤖 AI Usage Statement

During the development of **LeadDesk Mini**, AI assistance tools were utilized to accelerate initial boilerplate generation, refine TypeScript types, draft comprehensive documentation, and assist with code structure optimization. All architectural decisions—including the choice of framework abstractions, database schemas, state caching strategies, security configurations, code review auditing, and final verification—were performed, reviewed, and validated directly by the lead developer.

---

## 🔮 Future Improvements

1. **Role-Based Access Control (RBAC)**: Expand user roles to include `AGENT` and `MANAGER` with granular permissions.
2. **Automated Lead Assignment**: Automatically assign incoming leads to agents using round-robin distribution.
3. **Webhooks & Email Notifications**: Send automated email notifications via SendGrid/Resend when a new lead registers.
4. **Dark/Light Theme Toggle**: Add user preference persistence for customizable dashboard themes.
