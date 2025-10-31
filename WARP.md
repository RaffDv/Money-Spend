# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

BankBlend (Money Spend) is a financial management platform that integrates with banks via Pluggy to automatically track goals and finances. It's built as a monorepo using TurboRepo with a Next.js frontend and NestJS API backend.

## Development Commands

### Root Level Commands
- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all code
- `pnpm check-types` - Run TypeScript type checking across all packages
- `pnpm format` - Format code using Prettier

### Web App (Next.js Frontend)
Located in `apps/web/`
- `pnpm dev` - Start dev server with Turbopack on port 3000
- `pnpm build` - Build for production
- `pnpm lint` - ESLint with zero warnings policy
- `pnpm check-types` - TypeScript type checking
- `pnpm generate` - Generate API client using Kubb from OpenAPI spec

### API (NestJS Backend)
Located in `apps/api/`
- `pnpm dev` - Start development server with file watching
- `pnpm build` - Build the application
- `pnpm lint` - ESLint for TypeScript files
- `pnpm test` - Run Jest unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage
- `pnpm test:e2e` - Run end-to-end tests

## Architecture Overview

### Monorepo Structure
- **apps/web/** - Next.js 15 frontend with React 19, Tailwind CSS, and Radix UI
- **apps/api/** - NestJS backend with Prisma ORM and PostgreSQL
- **packages/eslint-config/** - Shared ESLint configuration
- **packages/typescript-config/** - Shared TypeScript configuration

### Frontend Architecture
- **Route Groups**: Uses Next.js App Router with route groups:
  - `(landing)/` - Public marketing pages
  - `(dashboard)/` - Protected dashboard pages  
  - `(auth)/` - Authentication flows
- **Authentication**: Supabase Auth with middleware protection
- **API Client**: Auto-generated using Kubb from OpenAPI spec (`bankblend-api.json`)
- **State Management**: TanStack React Query for server state
- **UI Components**: Radix UI primitives with Tailwind CSS and class-variance-authority
- **Theming**: next-themes with dark/light mode support

### Backend Architecture
- **Modules**:
  - `auth/` - JWT authentication and Supabase integration
  - `user/` - User management
  - `finance/` - Financial data and goals management
  - `prisma/` - Database service module
- **Database**: PostgreSQL with Prisma ORM using multi-schema (auth/public)
- **Authentication**: JWT strategy with Supabase integration
- **API Documentation**: Swagger/OpenAPI spec generation

### Database Schema
- Uses Supabase auth schema for user management
- Custom public schema for business logic
- Prisma client generated to `apps/api/generated/prisma`
- Multi-schema setup with RLS (Row Level Security)

## Key Technologies & Integrations

### Frontend Stack
- Next.js 15 with Turbopack
- React 19 with React Hook Form + Zod validation
- Tailwind CSS 4.x with custom animations
- Supabase client for authentication
- Framer Motion for animations
- Phosphor Icons and Lucide React

### Backend Stack  
- NestJS with Fastify adapter
- Prisma ORM with PostgreSQL
- Supabase for authentication
- Swagger/OpenAPI documentation
- Jest for testing
- Argon2 for password hashing

### Development Tools
- TurboRepo for monorepo management
- Biome for code formatting and linting
- Husky with Commitlint for git hooks
- TypeScript 5.8.3 across all packages
- pnpm as package manager

## Local Development Setup

1. **Database**: Start Supabase locally - `supabase start` (requires Docker)
2. **Environment**: Copy and configure `.env` files for both apps
3. **Dependencies**: `pnpm install` in root
4. **Development**: `pnpm dev` starts both frontend (port 3000) and API
5. **API Generation**: Run `pnpm generate` in web app after API changes

## Important Notes

- API client is auto-generated from OpenAPI spec - regenerate after backend changes
- Supabase local development uses ports 54321 (API), 54322 (DB), 54323 (Studio)
- Frontend uses Turbopack for faster development builds
- All packages use workspace references for internal dependencies
- Prisma schema includes Supabase auth tables - don't modify auth schema directly
- Database migrations are handled through Prisma, not Supabase migrations