import { BaseAgent } from '../BaseAgent';
import { UUID } from '../types/common';
import { Task, TaskResult } from '../types/task';

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
