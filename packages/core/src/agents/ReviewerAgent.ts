import { BaseAgent } from '../BaseAgent';
import { UUID } from '../types/common';
import { Task, TaskResult } from '../types/task';

export class ReviewerAgent extends BaseAgent {
    constructor(id: UUID, name: string) {
        super(id, name, 'reviewer');
        
        this.addCapability({ name: 'quality_assessment', confidence: 0.9, lastUsed: new Date() });
        this.addCapability({ name: 'improvement_suggestions', confidence: 0.85, lastUsed: new Date() });
        this.addCapability({ name: 'performance_analysis', confidence: 0.8, lastUsed: new Date() });
    }

    public async processTask(task: Task): Promise<TaskResult> {
        const startTime = Date.now();
        try {
            this.state.status = 'working';
            this.emit('reviewStarted', task);
            
            let review;
            if (task.type === 'coding') {
                review = this.reviewCode(task);
            } else if (task.type === 'optimization') {
                review = this.reviewOptimization(task);
            } else {
                review = this.createDefaultReview(task);
            }
            
            // Simulate detailed analysis
            await new Promise(resolve => setTimeout(resolve, 75));
            
            this.state.status = 'idle';
            this.updateTaskMetrics(startTime, true);
            
            return review;
        } catch (error) {
            this.state.status = 'idle';
            this.updateTaskMetrics(startTime, false);
            throw error;
        }
    }

    private reviewCode(task: Task): TaskResult {
        const implementation = task.implementation?.code || '';
        const suggestions = [];
        let quality = 0.9;
        
        // Check for error handling
        if (!implementation.includes('throw new Error')) {
            suggestions.push('Add error handling for edge cases');
            quality -= 0.1;
        }
        
        // Check for type checking
        if (!implementation.includes('typeof')) {
            suggestions.push('Add type checking for inputs');
            quality -= 0.1;
        }
        
        // Check for tests
        if (!implementation.includes('console.assert')) {
            suggestions.push('Add unit tests for the implementation');
            quality -= 0.1;
        }
        
        return {
            taskId: task.id,
            assessment: {
                quality,
                completeness: implementation.length > 100 ? 0.9 : 0.7,
                efficiency: 0.85
            },
            suggestions,
            metrics: {
                timeSpent: 75,
                confidence: 0.9
            }
        };
    }

    private reviewOptimization(task: Task): TaskResult {
        const originalCode = task.data.code;
        const optimizedCode = task.implementation?.code || '';
        const suggestions = [];
        let efficiency = 0.9;
        
        // Check if mathematical optimization was applied
        if (!optimizedCode.includes('n * (n - 1)')) {
            suggestions.push('Consider using mathematical formula for O(1) complexity');
            efficiency -= 0.2;
        }
        
        // Check for comments explaining optimization
        if (!optimizedCode.includes('// Use mathematical formula')) {
            suggestions.push('Add comments explaining the optimization approach');
            efficiency -= 0.1;
        }
        
        return {
            taskId: task.id,
            assessment: {
                quality: 0.85,
                completeness: 0.9,
                efficiency
            },
            suggestions,
            metrics: {
                timeSpent: 75,
                confidence: 0.85,
                performanceImprovement: efficiency > 0.8 ? 'significant' : 'moderate'
            }
        };
    }

    private createDefaultReview(task: Task): TaskResult {
        return {
            taskId: task.id,
            assessment: {
                quality: 0.85,
                completeness: 0.9,
                efficiency: 0.8
            },
            suggestions: [
                'Consider optimizing resource usage',
                'Add more detailed progress tracking'
            ],
            metrics: {
                timeSpent: 75,
                confidence: 0.85
            }
        };
    }

    protected async handleMessage(message: { from: UUID; content: any }): Promise<void> {
        const { from, content } = message;
        
        switch (content.type) {
            case 'review_request':
                console.log(`ReviewerAgent ${this.name} received review request from ${from}`);
                break;
            default:
                console.log(`ReviewerAgent ${this.name} received message from ${from}`);
        }
    }
}
