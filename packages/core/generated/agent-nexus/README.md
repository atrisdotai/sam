# agent-nexus

A modern Next.js 14 application with App Router, TypeScript, and Tailwind CSS.

## Features

- Next.js 14 App Router
- TypeScript (Strict Mode)
- Tailwind CSS
- ESLint + Prettier
- Husky + lint-staged
- Parallel Routes Demo
- Intercepting Routes Demo

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                # Next.js App Router
│   ├── (auth)/        # Auth-related routes
│   ├── (dashboard)/   # Dashboard routes
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # React components
│   └── ui/           # UI components
├── lib/              # Utility functions
├── public/           # Static assets
└── types/            # TypeScript types
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler
