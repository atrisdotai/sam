import { PlannerAgent } from '../agents/PlannerAgent';
import { DoerAgent } from '../agents/DoerAgent';
import { ReviewerAgent } from '../agents/ReviewerAgent';
import { UUID } from '../types/common';
import { Task, TaskResult } from '../types/task';

jest.setTimeout(5000);

describe('Agent System', () => {
    let planner: PlannerAgent;
    let doer: DoerAgent;
    let reviewer: ReviewerAgent;

    beforeEach(() => {
        console.log('\n=== Setting up new test ===');
        planner = new PlannerAgent('planner-1' as UUID, 'Test Planner');
        doer = new DoerAgent('doer-1' as UUID, 'Test Doer');
        reviewer = new ReviewerAgent('reviewer-1' as UUID, 'Test Reviewer');
        
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
});
