import { Agent, AgentCapability, AgentMetrics, AgentState } from './interfaces/Agent';
import { UUID } from './types/common';
import EventEmitter from 'events';
import crypto from 'crypto';

export abstract class BaseAgent extends EventEmitter implements Agent {
    public readonly id: UUID;
    public name: string;
    public role: 'planner' | 'doer' | 'reviewer';
    public capabilities: AgentCapability[];
    public expertise: {
        domains: string[];
        skills: string[];
        platforms: string[];
    };
    public metrics: AgentMetrics;
    public state: AgentState;
    public connections: Map<UUID, number>;

    private messageQueue: Array<{ from: UUID; content: any }>;

    constructor(
        id: UUID,
        name: string,
        role: 'planner' | 'doer' | 'reviewer'
    ) {
        super();
        this.id = id;
        this.name = name;
        this.role = role;
        this.capabilities = [];
        this.expertise = { domains: [], skills: [], platforms: [] };
        this.metrics = {
            successRate: 1.0,
            tasksCompleted: 0,
            avgResponseTime: 0,
            reputationScore: 1.0
        };
        this.state = {
            isActive: true,
            lastActive: new Date(),
            status: 'idle',
            memory: {
                shortTerm: new Map(),
                workingSet: new Set()
            }
        };
        this.connections = new Map();
        this.messageQueue = [];

        this.initialize();
    }

    public async initialize(): Promise<void> {
        // Base initialization logic
        console.log(`Initializing agent ${this.name} (${this.id})`);
    }

    public async shutdown(): Promise<void> {
        // Base shutdown logic
        this.state.isActive = false;
        console.log(`Shutting down agent ${this.name} (${this.id})`);
    }

    public abstract processTask(task: any): Promise<any>;

    public getStatus(): AgentState {
        return { ...this.state };
    }

    public async sendMessage(to: UUID, content: any): Promise<void> {
        // Create message object
        const message = {
            id: crypto.randomUUID(),
            from: this.id,
            to,
            content,
            timestamp: new Date()
        };

        // Emit message sent event
        this.emit('messageSent', message);

        // For testing purposes, immediately emit messageReceived event
        // This simulates the message being received by the target agent
        this.emit('messageReceived', message);
    }

    public async receiveMessage(from: UUID, content: any): Promise<void> {
        // Create message object for consistency
        const message = {
            id: crypto.randomUUID(),
            from,
            to: this.id,
            content,
            timestamp: new Date()
        };

        // Add to queue
        this.messageQueue.push({ from, content });

        // Emit message received event
        this.emit('messageReceived', message);

        // Process message
        await this.handleMessage({ from, content });
    }

    protected abstract handleMessage(message: { from: UUID; content: any }): Promise<void>;

    public updateMetrics(metrics: Partial<AgentMetrics>): void {
        this.metrics = { ...this.metrics, ...metrics };
    }

    public getMetrics(): AgentMetrics {
        return { ...this.metrics };
    }

    protected addCapability(capability: AgentCapability): void {
        this.capabilities.push(capability);
    }

    protected updateTaskMetrics(startTime: number, success: boolean): void {
        const duration = Date.now() - startTime;
        this.metrics.tasksCompleted += 1;
        this.metrics.avgResponseTime = (this.metrics.avgResponseTime * (this.metrics.tasksCompleted - 1) + duration) / this.metrics.tasksCompleted;
        
        if (success) {
            this.metrics.successRate = (this.metrics.successRate + 1) / 2;
            this.metrics.reputationScore = Math.min(1.0, this.metrics.reputationScore + 0.1);
        } else {
            this.metrics.successRate = this.metrics.successRate / 2;
            this.metrics.reputationScore = Math.max(0.0, this.metrics.reputationScore - 0.1);
        }

        // Update state
        this.state.lastActive = new Date();
    }
}
