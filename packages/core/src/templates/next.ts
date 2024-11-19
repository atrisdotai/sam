/**
 * Next.js Project Template Generator
 * 
 * Key Learnings & Requirements:
 * 1. Essential Files:
 *    - next-env.d.ts: Required for TypeScript support
 *    - app/layout.tsx: Root layout with proper metadata
 *    - app/page.tsx: Home page component
 *    - app/globals.css: Global styles with Tailwind imports
 *    - postcss.config.js: Required for Tailwind CSS
 *    - tailwind.config.js: Tailwind configuration
 * 
 * 2. Dependencies:
 *    - Must use caret (^) versions for Next.js and React to allow patches
 *    - Dependencies must be properly structured in package.json
 *    - All peer dependencies must be included
 * 
 * 3. Project Structure:
 *    - App Router structure (/app) is required for Next.js 14
 *    - Proper TypeScript configuration in tsconfig.json
 *    - Correct module resolution and paths
 * 
 * 4. Common Issues & Solutions:
 *    - "next: command not found": Ensure Next.js is properly installed as a dependency
 *    - Module resolution errors: Check tsconfig.json paths and moduleResolution
 *    - Styling issues: Verify postcss.config.js and tailwind.config.js
 */

import * as fs from 'fs';
import * as path from 'path';

export function generateNextProject(outputPath: string): void {
    // Create project structure
    const dirs = [
        'app',
        'app/(auth)',
        'app/(dashboard)',
        'components',
        'components/ui',
        'lib',
        'types',
        'public'
    ];
    
    for (const dir of dirs) {
        fs.mkdirSync(path.join(outputPath, dir), { recursive: true });
    }

    // Create package.json
    const packageJson = {
        name: path.basename(outputPath),
        version: '0.1.0',
        private: true,
        scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint'
        },
        dependencies: {
            'next': '^14.0.3',
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            'clsx': '^2.0.0',
            'framer-motion': '^10.16.4',
            'react-canvas-confetti': '^1.4.0',
            'tailwindcss-animate': '^1.0.7',
            'next-themes': '^0.2.1'
        },
        devDependencies: {
            '@types/node': '^20.10.0',
            '@types/react': '^18.2.39',
            '@types/react-dom': '^18.2.17',
            'autoprefixer': '^10.4.16',
            'postcss': '^8.4.31',
            'tailwindcss': '^3.3.5',
            'typescript': '^5.3.2',
            '@typescript-eslint/eslint-plugin': '^6.13.1',
            '@typescript-eslint/parser': '^6.13.1',
            'eslint': '^8.54.0',
            'eslint-config-next': '^14.0.3',
            'prettier': '^3.1.0'
        }
    };

    fs.writeFileSync(
        path.join(outputPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    // Create tsconfig.json
    const tsConfig = {
        compilerOptions: {
            target: 'es5',
            lib: ['dom', 'dom.iterable', 'esnext'],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            module: 'esnext',
            moduleResolution: 'bundler',
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: 'preserve',
            incremental: true,
            plugins: [
                {
                    name: 'next'
                }
            ],
            paths: {
                '@/*': ['./*']
            }
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
        exclude: ['node_modules']
    };

    fs.writeFileSync(
        path.join(outputPath, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );

    // Create Next.js configuration
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        typedRoutes: true,
    },
}

module.exports = nextConfig
`;

    fs.writeFileSync(path.join(outputPath, 'next.config.js'), nextConfig);

    // Create next-env.d.ts
    const nextEnv = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.`;

    fs.writeFileSync(path.join(outputPath, 'next-env.d.ts'), nextEnv);

    // Create app/providers.tsx for client-side providers
    const providersContent = `'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}`;

    fs.mkdirSync(path.join(outputPath, 'app'), { recursive: true });
    fs.writeFileSync(path.join(outputPath, 'app/providers.tsx'), providersContent);

    // Create app/layout.tsx
    const layoutContent = `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agent Nexus',
  description: 'A modern Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}`;

    fs.writeFileSync(path.join(outputPath, 'app/layout.tsx'), layoutContent);

    // Create app/globals.css
    const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    fs.writeFileSync(path.join(outputPath, 'app/globals.css'), globalsCSS);

    // Create app/page.tsx
    const pageContent = `'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConfettiButton } from '@/components/ui/confetti-button';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1 
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
        >
          Welcome to Agent Nexus
        </motion.h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Get started by editing{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 p-1 rounded">
            app/page.tsx
          </code>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Interactive UI</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Beautiful animations and transitions powered by Framer Motion
            </p>
            <Button>Learn More →</Button>
          </Card>

          <Card className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Dark Mode</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Toggle between light and dark themes
            </p>
            <Button
              variant="secondary"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              Toggle Theme 🌓
            </Button>
          </Card>
        </div>

        <ConfettiButton />
      </motion.div>
    </main>
  );
}`;

    fs.writeFileSync(path.join(outputPath, 'app/page.tsx'), pageContent);

    // Create components/ui/button.tsx
    const buttonComponent = `import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md' 
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-200 ease-in-out';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]}\`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}`;

    fs.mkdirSync(path.join(outputPath, 'components/ui'), { recursive: true });
    fs.writeFileSync(path.join(outputPath, 'components/ui/button.tsx'), buttonComponent);

    // Create components/ui/card.tsx
    const cardComponent = `import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={\`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 \${className}\`}
    >
      {children}
    </motion.div>
  );
}`;

    fs.writeFileSync(path.join(outputPath, 'components/ui/card.tsx'), cardComponent);

    // Create components/ui/confetti-button.tsx
    const confettiComponent = `import { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { Button } from './button';

export function ConfettiButton() {
  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current?.({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <div className="relative">
      <Button onClick={fire} variant="primary" size="lg">
        🎉 Celebrate!
      </Button>
      <ReactCanvasConfetti
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 50
        }}
        refConfetti={getInstance}
      />
    </div>
  );
}`;

    fs.writeFileSync(path.join(outputPath, 'components/ui/confetti-button.tsx'), confettiComponent);

    // Create postcss.config.js
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    fs.writeFileSync(path.join(outputPath, 'postcss.config.js'), postcssConfig);

    // Create tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`;

    fs.writeFileSync(path.join(outputPath, 'tailwind.config.js'), tailwindConfig);

    // Create .eslintrc.json
    const eslintConfig = `{
    "extends": [
        "next/core-web-vitals",
        "prettier"
    ]
}`;

    fs.writeFileSync(path.join(outputPath, '.eslintrc.json'), eslintConfig);

    // Create .prettierrc
    const prettierConfig = `{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "plugins": ["prettier-plugin-tailwindcss"]
}`;

    fs.writeFileSync(path.join(outputPath, '.prettierrc'), prettierConfig);

    // Create README.md
    const readme = `# ${path.basename(outputPath)}

## 🚀 Next.js 14 Project with Modern Stack

A production-ready Next.js 14 application template with App Router, TypeScript, and Tailwind CSS.

### ✨ Key Features

- **Next.js 14 App Router**: Latest features including Server Components and Server Actions
- **TypeScript**: Full type safety with strict mode enabled
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Modern Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting

### 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with HTML structure and Tailwind setup
│   ├── page.tsx           # Home page component with basic styling
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable React components
│   └── ui/               # UI components like buttons, forms, etc.
├── lib/                  # Utility functions, hooks, and shared logic
│   ├── api/              # API helpers
│   ├── hooks/            # Custom hooks
│   ├── types/            # Type guards and utility types
│   └── constants/        # Constants
├── public/              # Static assets
│   ├── images/          # Images
│   ├── fonts/           # Fonts
│   └── favicon.ico      # Favicon
└── types/               # TypeScript type definitions
    ├── global.d.ts      # Global type declarations
    └── api.d.ts         # API types
\`\`\`

### 🛠️ Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Package Manager**: pnpm (or npm/yarn)
- **Code Quality**:
  - ESLint with Next.js config
  - Prettier with Tailwind plugin
  - TypeScript in strict mode

### 🏃‍♂️ Getting Started

1. **Install Dependencies**:
   \`\`\`bash
   pnpm install   # or npm install
   \`\`\`

2. **Start Development Server**:
   \`\`\`bash
   pnpm dev      # or npm run dev
   \`\`\`

3. **Open Browser**:
   Visit [http://localhost:3000](http://localhost:3000)

### 📝 Available Scripts

- \`pnpm dev\`: Start development server
- \`pnpm build\`: Build for production
- \`pnpm start\`: Run production server
- \`pnpm lint\`: Run ESLint
- \`pnpm format\`: Format code with Prettier

### 🎨 Styling with Tailwind CSS

This template uses Tailwind CSS for styling. The configuration is in \`tailwind.config.js\`:
- Content paths configured for all components
- Basic theme extension setup
- PostCSS configured with Tailwind and Autoprefixer

### 📦 Key Dependencies

- \`next\`: ^14.0.3
- \`react\`: ^18.2.0
- \`react-dom\`: ^18.2.0
- \`typescript\`: ^5.3.2
- \`tailwindcss\`: ^3.3.5
- \`eslint\`: ^8.54.0
- \`prettier\`: ^3.1.0

### 🔧 Configuration Files

- \`next.config.js\`: Next.js configuration
- \`tsconfig.json\`: TypeScript configuration
- \`tailwind.config.js\`: Tailwind CSS configuration
- \`postcss.config.js\`: PostCSS configuration
- \`.eslintrc.json\`: ESLint rules
- \`.prettierrc\`: Prettier settings

### 🏗️ Project Structure Explanation

- \`app/\`: Contains all pages and layouts using Next.js 14 App Router
  - \`layout.tsx\`: Root layout with HTML structure and Tailwind setup
  - \`page.tsx\`: Home page component with basic styling
  - \`globals.css\`: Global styles and Tailwind imports

- \`components/\`: Reusable React components
  - \`ui/\`: UI components like buttons, forms, etc.

- \`lib/\`: Utility functions, hooks, and shared logic
  - \`api/\`: API helpers
  - \`hooks/\`: Custom hooks
  - \`types/\`: Type guards and utility types
  - \`constants/\`: Constants

- \`public/\`: Static assets
  - \`images/\`: Images
  - \`fonts/\`: Fonts
  - \`favicon.ico\`: Favicon

- \`types/\`: TypeScript type definitions
  - \`global.d.ts\`: Global type declarations
  - \`api.d.ts\`: API types

### 🔍 Best Practices

1. **TypeScript**:
   - Use strict mode for better type safety
   - Define types for all props and API responses
   - Utilize utility types when appropriate

2. **Components**:
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement error boundaries where needed

3. **Styling**:
   - Use Tailwind CSS utility classes
   - Create consistent spacing and color schemes
   - Utilize Tailwind's configuration for customization

4. **Code Quality**:
   - Run linting before commits (automated with Husky)
   - Format code consistently with Prettier
   - Write meaningful commit messages

### 🚀 Deployment

This project can be deployed to any platform that supports Next.js:

1. **Vercel** (Recommended):
   - Connect your repository
   - Vercel will automatically detect Next.js
   - No additional configuration needed

2. **Other Platforms**:
   - Build the project: \`pnpm build\`
   - Start the server: \`pnpm start\`
   - Use appropriate platform-specific configuration

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### 📄 License

This project is open source and available under the MIT License.
`;

    fs.writeFileSync(path.join(outputPath, 'README.md'), readme);
}
