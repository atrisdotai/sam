import { PlannerAgent } from '../agents/PlannerAgent';
import { DoerAgent } from '../agents/DoerAgent';
import { ReviewerAgent } from '../agents/ReviewerAgent';
import { UUID } from '../types/common';
import { Task, TaskResult } from '../types/task';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.setTimeout(5000);

describe('Agent System', () => {
    let planner: PlannerAgent;
    let doer: DoerAgent;
    let reviewer: ReviewerAgent;
    const outputDir = path.join(__dirname, '../../../generated');

    beforeEach(async () => {
        console.log('\n=== Setting up new test ===');
        planner = new PlannerAgent('planner-1' as UUID, 'Test Planner');
        doer = new DoerAgent('doer-1' as UUID, 'Test Doer');
        reviewer = new ReviewerAgent('reviewer-1' as UUID, 'Test Reviewer');
        
        // Ensure output directory exists
        await fs.mkdir(outputDir, { recursive: true });
        
        // Set up event listeners to show agent interactions
        planner.on('taskReceived', (task) => {
            console.log(` Planner received task: ${JSON.stringify(task, null, 2)}`);
        });
        
        planner.on('planCreated', (plan) => {
            console.log(` Planner created plan: ${JSON.stringify(plan, null, 2)}`);
        });
        
        doer.on('taskStarted', (task) => {
            console.log(` Doer starting work on task: ${task.id}`);
        });
        
        doer.on('stepCompleted', (step) => {
            console.log(` Doer completed step: ${JSON.stringify(step, null, 2)}`);
        });
        
        reviewer.on('reviewStarted', (task) => {
            console.log(` Reviewer analyzing task: ${task.id}`);
        });
    });

    afterEach(async () => {
        await planner.shutdown();
        await doer.shutdown();
        await reviewer.shutdown();
        console.log('=== Test cleanup complete ===\n');
    });

    test('generate complete code file', async () => {
        console.log('\n Testing code file generation:');
        
        // Create a task to generate a data processing utility
        const task: Task = {
            id: 'generate-file-123',
            type: 'coding',
            data: {
                description: 'Create a data processing utility',
                requirements: [
                    'Function to parse CSV data',
                    'Function to transform data',
                    'Function to validate data',
                    'Export utility functions'
                ],
                filename: 'dataUtils.ts',
                outputPath: outputDir
            }
        };
        
        console.log('\n1. Planning file structure and implementation...');
        const planResult = await planner.processTask(task);
        
        console.log('\n2. Implementing the code...');
        const implementationResult = await doer.processTask({
            ...task,
            plan: planResult.plan
        });
        
        console.log('\n3. Reviewing implementation...');
        const reviewResult = await reviewer.processTask({
            ...task,
            implementation: implementationResult.result
        });
        
        // If review is good, save the file
        if (reviewResult.assessment.quality > 0.8) {
            const filePath = path.join(task.data.outputPath, task.data.filename);
            await fs.writeFile(filePath, implementationResult.result.code);
            console.log(`\n Generated file saved to: ${filePath}`);
            
            // Read and display the generated file
            const generatedCode = await fs.readFile(filePath, 'utf8');
            console.log('\n Generated Code:');
            console.log(generatedCode);
        }
        
        expect(reviewResult.assessment.quality).toBeGreaterThan(0.8);
        expect(implementationResult.result.code).toBeDefined();
        expect(implementationResult.result.success).toBe(true);
    });

    test('collaborative task execution', async () => {
        console.log('\n Testing collaborative task execution:');
        
        // Create a coding task
        const task: Task = {
            id: 'code-task-123',
            type: 'coding',
            data: {
                description: 'Create a simple calculator function',
                requirements: [
                    'Add two numbers',
                    'Subtract two numbers',
                    'Handle invalid inputs'
                ]
            }
        };
        
        console.log('\n1. Starting task planning phase...');
        const planResult = await planner.processTask(task);
        console.log(`\n Planning completed with ${planResult.plan.steps.length} steps`);
        
        console.log('\n2. Executing task with Doer...');
        const implementationResult = await doer.processTask({
            ...task,
            plan: planResult.plan
        });
        
        console.log('\n3. Reviewing implementation...');
        const reviewResult = await reviewer.processTask({
            ...task,
            implementation: implementationResult.result
        });
        
        console.log('\n Final Results:');
        console.log('Planning:', JSON.stringify(planResult, null, 2));
        console.log('Implementation:', JSON.stringify(implementationResult, null, 2));
        console.log('Review:', JSON.stringify(reviewResult, null, 2));
    });

    test('agent collaboration with feedback loop', async () => {
        console.log('\n Testing agent collaboration with feedback:');
        
        const task: Task = {
            id: 'feedback-task-123',
            type: 'optimization',
            data: {
                description: 'Optimize slow function for better performance',
                code: `
                    function slowFunction(n) {
                        let result = 0;
                        for(let i = 0; i < n; i++) {
                            result += i;
                        }
                        return result;
                    }
                `,
                goal: 'Optimize the function for better performance'
            }
        };
        
        console.log('\n1. Initial review of code...');
        const initialReview = await reviewer.processTask(task);
        
        console.log('\n2. Planning optimization based on review...');
        const optimizationPlan = await planner.processTask({
            ...task,
            review: initialReview
        });
        
        console.log('\n3. Implementing optimizations...');
        const optimizedResult = await doer.processTask({
            ...task,
            plan: optimizationPlan.plan
        });
        
        console.log('\n4. Final review of optimized code...');
        const finalReview = await reviewer.processTask({
            ...task,
            implementation: optimizedResult.result
        });
        
        console.log('\n Optimization Results:');
        console.log('Initial Review:', JSON.stringify(initialReview, null, 2));
        console.log('Optimization Plan:', JSON.stringify(optimizationPlan, null, 2));
        console.log('Implementation:', JSON.stringify(optimizedResult, null, 2));
        console.log('Final Review:', JSON.stringify(finalReview, null, 2));
    });

    test('generate complete project structure', async () => {
        console.log('\n📝 Testing project generation:');
        
        // Create a task to generate a complete Express.js API project
        const task: Task = {
            id: 'generate-project-123',
            type: 'project',
            data: {
                description: 'Create an Express.js API project with TypeScript',
                requirements: [
                    'Project structure with src, tests, and docs directories',
                    'Express.js server with basic routes',
                    'TypeScript configuration',
                    'Package.json with dependencies',
                    'README.md with setup instructions',
                    'Basic user CRUD API endpoints',
                    'Jest test setup'
                ],
                outputPath: path.join(__dirname, '../../../generated/express-api')
            }
        };

        // 1. Planning phase
        console.log('\n1️⃣ Planning project structure...');
        const planResult = await planner.processTask(task);

        // 2. Implementation phase
        console.log('\n2️⃣ Creating project files...');
        const implementationResult = await doer.processTask({
            ...task,
            plan: planResult.plan
        });

        // 3. Review phase
        console.log('\n3️⃣ Reviewing project structure...');
        const reviewResult = await reviewer.processTask({
            ...task,
            implementation: implementationResult.result
        });

        // Ensure the project was created successfully
        expect(reviewResult.assessment.quality).toBeGreaterThan(0.8);
        expect(implementationResult.result.success).toBe(true);
        
        // Log the project structure
        console.log('\n📁 Generated Project Structure:');
        await fs.readdir(task.data.outputPath, { recursive: true })
            .then(files => console.log(files.map(f => `  ${f}`).join('\n')));
    });
});
