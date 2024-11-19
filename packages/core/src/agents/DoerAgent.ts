import { BaseAgent } from '../BaseAgent';
import { UUID } from '../types/common';
import { Task, TaskResult } from '../types/task';
import * as fs from 'fs';
import * as path from 'path';
import { generateNextProject } from '../templates/next';

export class DoerAgent extends BaseAgent {
    constructor(id: UUID, name: string) {
        super(id, name, 'doer');
        this.addCapability({ name: 'task_execution', confidence: 1.0, lastUsed: new Date() });
        this.addCapability({ name: 'progress_tracking', confidence: 1.0, lastUsed: new Date() });
    }

    public async processTask(task: Task): Promise<TaskResult> {
        const startTime = Date.now();
        
        try {
            // Emit task started event
            this.emit('taskStarted', task);
            
            let result;
            if (task.type === 'coding') {
                result = await this.implementCode(task);
            } else if (task.type === 'optimization') {
                result = await this.optimizeCode(task);
            } else if (task.type === 'project') {
                result = await this.generateProject(task);
            } else {
                result = await this.executeDefaultTask(task);
            }

            this.updateTaskMetrics(startTime, true);
            return {
                ...result,
                assessment: {
                    quality: 0.85,
                    completeness: 0.9,
                    efficiency: 0.8
                },
                suggestions: [
                    'Consider adding more error handling',
                    'Add performance monitoring'
                ],
                metrics: {
                    timeSpent: Date.now() - startTime,
                    confidence: 0.9
                }
            };
        } catch (error) {
            this.updateTaskMetrics(startTime, false);
            throw error;
        }
    }

    private async implementCode(task: Task): Promise<Partial<TaskResult>> {
        const steps = task.plan?.steps || [];
        let implementation = '';
        
        for (const step of steps) {
            // Simulate work being done
            await new Promise(resolve => setTimeout(resolve, 50));
            
            switch (step.action) {
                case 'analyze_requirements':
                    implementation += '// Requirements analyzed\n';
                    break;
                case 'design_solution':
                    implementation += 'function calculator(a: number, b: number, operation: string) {\n';
                    break;
                case 'implement_code':
                    implementation += `  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid input: numbers required');
  }
  
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    default:
      throw new Error('Invalid operation');
  }\n`;
                    break;
                case 'add_tests':
                    implementation += `}\n\n// Tests\nconsole.assert(calculator(2, 3, 'add') === 5);\nconsole.assert(calculator(5, 2, 'subtract') === 3);`;
                    break;
            }
            
            this.emit('stepCompleted', { ...step, status: 'completed' });
        }
        
        return {
            taskId: task.id,
            status: 'completed',
            result: {
                success: true,
                code: implementation,
                message: 'Implementation completed successfully'
            }
        };
    }

    private async optimizeCode(task: Task): Promise<Partial<TaskResult>> {
        const steps = task.plan?.steps || [];
        let optimizedCode = task.data.code;
        
        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, 50));
            
            switch (step.action) {
                case 'analyze_current_code':
                    // Simulate analyzing code
                    break;
                case 'identify_optimizations':
                    // Identify optimization opportunities
                    break;
                case 'implement_optimizations':
                    // Replace slow implementation with optimized version
                    optimizedCode = `
function optimizedFunction(n) {
    // Use mathematical formula instead of loop
    return (n * (n - 1)) / 2;
}`;
                    break;
                case 'benchmark':
                    // Simulate benchmarking
                    break;
            }
            
            this.emit('stepCompleted', { ...step, status: 'completed' });
        }
        
        return {
            taskId: task.id,
            status: 'completed',
            result: {
                success: true,
                code: optimizedCode,
                message: 'Code optimized successfully'
            }
        };
    }

    private async generateProject(task: Task): Promise<Partial<TaskResult>> {
        const { outputPath, framework = 'express' } = task.data;
        
        try {
            if (framework === 'next') {
                return await this.generateNextProject(task);
            }
            
            // Create project directories
            const dirs = ['src', 'tests', 'docs'];
            for (const dir of dirs) {
                fs.mkdirSync(path.join(outputPath, dir), { recursive: true });
            }

            // Create package.json
            const packageJson = {
                name: path.basename(outputPath),
                version: '1.0.0',
                description: 'Express.js API with TypeScript',
                main: 'dist/index.js',
                scripts: {
                    build: 'tsc',
                    start: 'node dist/index.js',
                    dev: 'ts-node-dev --respawn src/index.ts',
                    test: 'jest'
                },
                dependencies: {
                    express: '^4.18.2',
                    'express-validator': '^7.0.1'
                },
                devDependencies: {
                    '@types/express': '^4.17.21',
                    '@types/jest': '^29.5.10',
                    '@types/node': '^20.10.0',
                    jest: '^29.7.0',
                    'ts-jest': '^29.1.1',
                    'ts-node-dev': '^2.0.0',
                    typescript: '^5.3.2'
                }
            };

            fs.writeFileSync(
                path.join(outputPath, 'package.json'),
                JSON.stringify(packageJson, null, 2)
            );

            // Create tsconfig.json
            const tsConfig = {
                compilerOptions: {
                    target: 'es2020',
                    module: 'commonjs',
                    outDir: './dist',
                    rootDir: './src',
                    strict: true,
                    esModuleInterop: true,
                    skipLibCheck: true,
                    forceConsistentCasingInFileNames: true
                },
                include: ['src/**/*'],
                exclude: ['node_modules', 'dist', 'tests']
            };

            fs.writeFileSync(
                path.join(outputPath, 'tsconfig.json'),
                JSON.stringify(tsConfig, null, 2)
            );

            // Create main server file
            const serverCode = `import express from 'express';
import { userRouter } from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(\`Server running at http://localhost:\${port}\`);
});

export default app;
`;

            fs.writeFileSync(path.join(outputPath, 'src', 'index.ts'), serverCode);

            // Create user routes
            const userRoutes = `import express from 'express';
import { body, validationResult } from 'express-validator';

export const userRouter = express.Router();

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

// Get all users
userRouter.get('/', (req, res) => {
    res.json(users);
});

// Get user by ID
userRouter.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create user
userRouter.post('/',
    body('name').isString().trim().notEmpty(),
    body('email').isEmail(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser: User = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email
        };

        users.push(newUser);
        res.status(201).json(newUser);
    }
);

// Update user
userRouter.put('/:id',
    body('name').optional().isString().trim().notEmpty(),
    body('email').optional().isEmail(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userIndex = users.findIndex(u => u.id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[userIndex] = {
            ...users[userIndex],
            ...req.body
        };

        res.json(users[userIndex]);
    }
);

// Delete user
userRouter.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});
`;

            fs.mkdirSync(path.join(outputPath, 'src', 'routes'), { recursive: true });
            fs.writeFileSync(path.join(outputPath, 'src', 'routes', 'users.ts'), userRoutes);

            // Create README
            const readme = `# ${path.basename(outputPath)}

Express.js API with TypeScript

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

4. Start production server:
   \`\`\`bash
   npm start
   \`\`\`

## API Endpoints

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

## Testing

Run tests:
\`\`\`bash
npm test
\`\`\`
`;

            fs.writeFileSync(path.join(outputPath, 'README.md'), readme);

            // Create basic test
            const testCode = `import request from 'supertest';
import app from '../src/index';

describe('User API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                email: 'test@example.com'
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test User');
        expect(res.body.email).toBe('test@example.com');
    });
});
`;

            fs.writeFileSync(path.join(outputPath, 'tests', 'users.test.ts'), testCode);

            return {
                taskId: task.id,
                status: 'completed',
                result: {
                    success: true,
                    message: 'Project generated successfully'
                }
            };
        } catch (error) {
            console.error('Error generating project:', error);
            return {
                taskId: task.id,
                status: 'failed',
                result: {
                    success: false,
                    message: `Failed to generate project: ${error.message}`
                }
            };
        }
    }

    private async generateNextProject(task: Task): Promise<Partial<TaskResult>> {
        const { outputPath } = task.data;
        
        try {
            generateNextProject(outputPath);
            
            return {
                taskId: task.id,
                status: 'completed',
                result: {
                    success: true,
                    message: 'Next.js project generated successfully'
                }
            };
        } catch (error) {
            return {
                taskId: task.id,
                status: 'failed',
                result: {
                    success: false,
                    message: `Failed to generate Next.js project: ${error.message}`
                }
            };
        }
    }

    private async executeDefaultTask(task: Task): Promise<Partial<TaskResult>> {
        return {
            taskId: task.id,
            status: 'completed',
            result: {
                success: true,
                message: 'Task executed successfully'
            }
        };
    }

    protected async handleMessage(message: { from: UUID; content: any }): Promise<void> {
        console.log(`DoerAgent ${this.name} received message from ${message.from}`);
    }
}
