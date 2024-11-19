'use client';

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
}