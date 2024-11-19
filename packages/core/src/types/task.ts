export interface Task {
    id: string;
    type: 'coding' | 'optimization' | 'test' | 'project';
    data: {
        description: string;
        requirements?: string[];
        code?: string;
        goal?: string;
        filename?: string;
        outputPath?: string;
        framework?: string;
    };
    plan?: {
        steps: Array<{
            id: number;
            action: string;
            status: 'pending' | 'in_progress' | 'completed' | 'failed';
            details?: string;
        }>;
    };
    implementation?: {
        code?: string;
        success: boolean;
        message: string;
    };
    review?: TaskResult;
}

export interface TaskResult {
    taskId: string;
    status?: 'pending' | 'in_progress' | 'completed' | 'failed';
    plan?: {
        steps: Array<{
            id: number;
            action: string;
            status: 'pending' | 'in_progress' | 'completed' | 'failed';
            details?: string;
        }>;
    };
    result?: {
        success: boolean;
        code?: string;
        message: string;
    };
    assessment: {
        quality: number;
        completeness: number;
        efficiency: number;
    };
    suggestions: string[];
    metrics: {
        timeSpent: number;
        confidence: number;
        performanceImprovement?: string;
    };
}
