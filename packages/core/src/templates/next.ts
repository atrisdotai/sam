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
            lint: 'next lint',
            format: 'prettier --write .',
            'type-check': 'tsc --noEmit',
            prepare: 'husky install'
        },
        dependencies: {
            'next': '^14.0.3',
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            'clsx': '^2.0.0',
            'tailwindcss-animate': '^1.0.7'
        },
        devDependencies: {
            '@types/node': '^20.10.0',
            '@types/react': '^18.2.39',
            '@types/react-dom': '^18.2.17',
            '@typescript-eslint/eslint-plugin': '^6.13.1',
            '@typescript-eslint/parser': '^6.13.1',
            'autoprefixer': '^10.4.16',
            'eslint': '^8.54.0',
            'eslint-config-next': '^14.0.3',
            'eslint-config-prettier': '^9.0.0',
            'husky': '^8.0.3',
            'lint-staged': '^15.1.0',
            'postcss': '^8.4.31',
            'prettier': '^3.1.0',
            'prettier-plugin-tailwindcss': '^0.5.7',
            'tailwindcss': '^3.3.5',
            'typescript': '^5.3.2'
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

    // Create app/layout.tsx
    const layoutContent = `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
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
    const pageContent = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Agent Nexus</h1>
      <p className="text-xl text-gray-600">
        Get started by editing <code className="font-mono bg-gray-100 p-1 rounded">app/page.tsx</code>
      </p>
    </main>
  );
}`;

    fs.writeFileSync(path.join(outputPath, 'app/page.tsx'), pageContent);

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
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
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

    // Create .lintstagedrc
    const lintStagedConfig = `{
    "*.{js,jsx,ts,tsx}": [
        "eslint --fix",
        "prettier --write"
    ],
    "*.{json,css,md}": [
        "prettier --write"
    ]
}`;

    fs.writeFileSync(path.join(outputPath, '.lintstagedrc'), lintStagedConfig);

    // Create README.md
    const readme = `# ${path.basename(outputPath)}

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
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
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
\`\`\`

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run format\` - Format code with Prettier
- \`npm run type-check\` - Run TypeScript compiler
`;

    fs.writeFileSync(path.join(outputPath, 'README.md'), readme);
}
