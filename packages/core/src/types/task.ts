export interface Task {
    id: string;
    type: 'coding' | 'optimization' | 'test';
    data: any;
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
    plan?: Task['plan'];
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
