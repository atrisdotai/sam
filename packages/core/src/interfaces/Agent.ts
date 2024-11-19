import { UUID } from '../types/common';

export interface AgentCapability {
    name: string;
    confidence: number;
    lastUsed: Date;
}

export interface AgentMetrics {
    successRate: number;
    tasksCompleted: number;
    avgResponseTime: number;
    reputationScore: number;
}

export interface AgentState {
    isActive: boolean;
    currentTask?: string;
    lastActive: Date;
    status: 'idle' | 'working' | 'waiting';
    memory: {
        shortTerm: Map<string, any>;
        workingSet: Set<string>;
    };
}

export interface Agent {
    id: UUID;
    name: string;
    role: 'planner' | 'doer' | 'reviewer';
    capabilities: AgentCapability[];
    state: AgentState;
    metrics: AgentMetrics;
    
    // Core functionality
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    
    // Task management
    processTask(task: any): Promise<any>;
    getStatus(): AgentState;
    
    // Communication
    sendMessage(to: UUID, content: any): Promise<void>;
    receiveMessage(from: UUID, content: any): Promise<void>;
    
    // Metrics
    updateMetrics(metrics: Partial<AgentMetrics>): void;
    getMetrics(): AgentMetrics;
}
