# agent-nexus

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

```
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
```

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
   ```bash
   pnpm install   # or npm install
   ```

2. **Start Development Server**:
   ```bash
   pnpm dev      # or npm run dev
   ```

3. **Open Browser**:
   Visit [http://localhost:3000](http://localhost:3000)

### 📝 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Run production server
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier

### 🎨 Styling with Tailwind CSS

This template uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`:
- Content paths configured for all components
- Basic theme extension setup
- PostCSS configured with Tailwind and Autoprefixer

### 📦 Key Dependencies

- `next`: ^14.0.3
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `typescript`: ^5.3.2
- `tailwindcss`: ^3.3.5
- `eslint`: ^8.54.0
- `prettier`: ^3.1.0

### 🔧 Configuration Files

- `next.config.js`: Next.js configuration
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `.eslintrc.json`: ESLint rules
- `.prettierrc`: Prettier settings

### 🏗️ Project Structure Explanation

- `app/`: Contains all pages and layouts using Next.js 14 App Router
  - `layout.tsx`: Root layout with HTML structure and Tailwind setup
  - `page.tsx`: Home page component with basic styling
  - `globals.css`: Global styles and Tailwind imports

- `components/`: Reusable React components
  - `ui/`: UI components like buttons, forms, etc.

- `lib/`: Utility functions, hooks, and shared logic
  - `api/`: API helpers
  - `hooks/`: Custom hooks
  - `types/`: Type guards and utility types
  - `constants/`: Constants

- `public/`: Static assets
  - `images/`: Images
  - `fonts/`: Fonts
  - `favicon.ico`: Favicon

- `types/`: TypeScript type definitions
  - `global.d.ts`: Global type declarations
  - `api.d.ts`: API types

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
   - Build the project: `pnpm build`
   - Start the server: `pnpm start`
   - Use appropriate platform-specific configuration

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### 📄 License

This project is open source and available under the MIT License.
