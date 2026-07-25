# 🎓 LeadDesk Mini - Technical Interview Preparation Guide

This document contains 15 technical interview questions, architectural explanations, and technology stack justifications designed for technical interviews and project defense.

---

## 🎯 Tech Stack Choices & Architectural Justification

### 1. Why Next.js 15 (App Router)?
- **Server/Client Component Architecture**: Next.js 15 allows rendering static parts of the public landing page on the server for optimal SEO and performance, while keeping interactive components (lead capture modal, admin data table) as dynamic Client Components (`'use client'`).
- **File-Based Routing & Layouts**: Next.js App Router provides route grouping `(admin)` with dedicated root layouts (`layout.tsx`) that preserve state across page transitions.

### 2. Why NestJS?
- **Modular Enterprise Architecture**: NestJS provides a scalable structure (Modules, Controllers, Services, Repositories) enforcing clean separation of concerns out of the box.
- **Built-in TypeScript & Decorators**: Strong typing prevents runtime errors. Declarative decorators (`@Post()`, `@UseGuards()`, `@Body()`) streamline API route definitions and request validation.

### 3. Why MongoDB & Mongoose?
- **Flexible Document Schema**: Lead data often evolves (e.g. adding custom fields, status updates, metadata). MongoDB’s JSON/BSON document model handles non-uniform lead attributes effortlessly.
- **Repository Pattern Compatibility**: Mongoose ODM couples seamlessly with TypeScript classes and DTOs.

### 4. Why JWT (JSON Web Tokens)?
- **Stateless Authentication**: Server scaling does not require shared session stores (like Redis) for checking login sessions; the backend decodes and validates signed claims in the HTTP Authorization header (`Bearer <token>`).

### 5. Why TanStack Query (React Query) & Zod?
- **TanStack Query**: Eliminates manual `useEffect` data fetching loops. Handles automated background refetching, client-side query caching (`staleTime`), and instant cache invalidation upon mutation (`queryClient.invalidateQueries`).
- **Zod & React Hook Form**: Provides type-safe schema validation shared across client inputs and server DTOs, giving users instant inline validation feedback without page re-renders.

---

## ❓ 15 Technical Interview Questions & Answers

### **Q1: How does authentication work end-to-end in LeadDesk Mini?**
> **Answer:** The admin submits credentials via `/api/auth/login`. The NestJS backend verifies the email/username and compares the submitted password against the salted database hash using `bcrypt.compare()`. Upon verification, NestJS signs a JWT payload (`sub`, `email`, `role`) using `@nestjs/jwt`. The frontend receives the token, stores it in `localStorage`, and injects it into every outgoing request via Axios request interceptors (`Authorization: Bearer <token>`). On protected routes, NestJS's `JwtAuthGuard` and `JwtStrategy` decode and validate the signature.

---

### **Q2: How do you handle unauthorized access or expired JWT tokens on the frontend?**
> **Answer:** We configured an Axios response interceptor in `lib/api-client.ts`. If any backend endpoint returns a `401 Unauthorized` HTTP status (indicating an expired or invalid token), the interceptor automatically clears `localStorage.removeItem('token')` and redirects the user to `/admin/login`.

---

### **Q3: Explain how real-time lead cache invalidation works when a user submits a lead.**
> **Answer:** When a user submits a lead on the public landing page via `useCreateLead()` mutation hook, upon successful API response we execute `queryClient.invalidateQueries({ queryKey: ['leads'] })`. If an admin is currently viewing the dashboard, TanStack Query automatically refetches the updated lead list in the background without requiring a page refresh.

---

### **Q4: How did you implement security hardening on the NestJS backend?**
> **Answer:** We implemented multiple layers of backend security:
> 1. **Helmet Middleware**: Configures HTTP headers against XSS, clickjacking, and MIME sniffing.
> 2. **Throttler Module**: Enforces rate limiting (100 requests per minute) against DDoS / brute-force attempts.
> 3. **Validation Pipe**: Enforces strict payload validation (`whitelist: true`, `forbidNonWhitelisted: true`) to prevent mass assignment vulnerabilities.
> 4. **CORS Configuration**: Restricts API calls strictly to allowed origin domains.

---

### **Q5: Why did you separate database operations into a Repository layer (`users.repository.ts`) instead of querying Mongoose directly in Services?**
> **Answer:** Using the Repository pattern abstracts data access away from business logic (`users.service.ts`). This ensures single responsibility (SRP), keeps services clean, and allows us to swap ORMs or mock database calls cleanly during unit testing.

---

### **Q6: How do you handle password security and storage?**
> **Answer:** Passwords are never stored in plain text. We hash passwords using `bcrypt` with a salt round factor of `10`. Additionally, the password property in `user.schema.ts` is configured with `@Prop({ select: false })`, ensuring Mongoose queries exclude password hashes from API responses by default unless explicitly requested with `.select('+password')`.

---

### **Q7: What is the purpose of NestJS `TransformInterceptor` and `HttpExceptionFilter`?**
> **Answer:** `TransformInterceptor` normalizes all successful API responses into a unified JSON contract `{ success: true, message: '...', data: ... }`. `HttpExceptionFilter` intercepts all thrown exceptions and converts them into structured error responses, preventing unhandled runtime stack traces from leaking to clients.

---

### **Q8: How is route protection implemented on Next.js frontend pages?**
> **Answer:** In `src/context/auth-context.tsx`, the `AuthProvider` initializes session state on mount. Admin pages check `isAuthenticated` and `isLoading`. If an unauthenticated user attempts to access `/admin/dashboard`, `useAuth` hook triggers a client-side redirect to `/admin/login`.

---

### **Q9: How did you optimize MongoDB queries for lead filtering and searching?**
> **Answer:** In `leads.repository.ts`, we construct dynamic Mongoose filter queries. For search terms, we use `$or` conditions with `$regex` (case-insensitive `'i'`) across name, email, and company fields, combined with status filtering and pagination via `.skip()` and `.limit()`.

---

### **Q10: What is the benefit of using React Hook Form over traditional React `useState` form handling?**
> **Answer:** Traditional `useState` re-renders the entire component on every keystroke. React Hook Form uses uncontrolled components with refs, eliminating unnecessary re-renders. Combined with Zod resolvers, validation happens efficiently without UI lag.

---

### **Q11: How do you ensure environment variables are validated in production?**
> **Answer:** In NestJS, `@nestjs/config` loads environment variables through a custom configuration loader `env.config.ts` with fallback defaults. In production deployment configurations (`render.yaml` and `vercel.json`), required variables are marked as mandatory.

---

### **Q12: Explain the structure of the health check endpoint `/api/health`.**
> **Answer:** `/api/health` is a lightweight public endpoint exposed by `HealthController`. It returns `{ status: 'ok', uptime: process.uptime(), timestamp: ... }`. Deployment platforms like Render poll this route to verify that the container is healthy before routing live traffic.

---

### **Q13: How does CSV Export work on the admin dashboard?**
> **Answer:** The frontend triggers `exportToCSV(leads)` utility, which converts the array of lead objects into a formatted CSV string, creates a temporary Blob URL in memory, attaches an anchor element to the document DOM, and triggers an automated download before revoking the Blob URL.

---

### **Q14: How are CORS credentials handled between Next.js and NestJS?**
> **Answer:** NestJS enables CORS with `credentials: true` and explicitly specifies allowed origins (`FRONTEND_URL` and `http://localhost:3000`). Axios client sets `withCredentials: true` when communicating across origins.

---

### **Q15: How does database seeding work in this project?**
> **Answer:** Running `npm run seed` executes `src/database/seed.ts`, which bootstraps a NestJS application context without launching the HTTP web server. `SeedService` checks if `admin@leaddesk.com` exists; if missing, it hashes `Admin@123` via bcrypt and creates the initial admin document.
