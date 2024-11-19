export type UUID = string;

export interface Task {
    id: UUID;
    type: string;
    priority: number;
    data: any;
    requiredCapabilities: string[];
    deadline?: Date;
    status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed';
    assignedTo?: UUID;
    createdAt: Date;
    updatedAt: Date;
}

export interface KnowledgeNode {
    id: UUID;
    type: string;
    content: any;
    metadata: {
        source: UUID;
        timestamp: Date;
        confidence: number;
        tags: string[];
    };
    connections: Array<{
        nodeId: UUID;
        relationship: string;
        strength: number;
    }>;
}

export interface AgentMessage {
    id: UUID;
    from: UUID;
    to: UUID | 'broadcast';
    type: 'task' | 'knowledge' | 'status' | 'request' | 'response';
    content: any;
    timestamp: Date;
    metadata?: Record<string, any>;
}
