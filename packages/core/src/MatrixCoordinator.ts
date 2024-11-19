import { Agent } from './interfaces/Agent';
import { UUID } from './types/common';
import EventEmitter from 'events';

export class MatrixCoordinator extends EventEmitter {
    private agents: Map<UUID, Agent>;
    private taskQueue: any[];
    private knowledgeGraph: Map<string, Set<UUID>>;
    
    constructor() {
        super();
        this.agents = new Map();
        this.taskQueue = [];
        this.knowledgeGraph = new Map();
    }
    
    public registerAgent(agent: Agent): void {
        this.agents.set(agent.id, agent);
        this.indexAgentCapabilities(agent);
        this.emit('agentRegistered', agent.id);
    }
    
    public removeAgent(agentId: UUID): void {
        const agent = this.agents.get(agentId);
        if (agent) {
            this.agents.delete(agentId);
            this.removeFromKnowledgeGraph(agent);
            this.emit('agentRemoved', agentId);
        }
    }
    
    public async dispatchTask(task: any): Promise<void> {
        const bestAgents = this.findBestAgentsForTask(task);
        if (bestAgents.length === 0) {
            this.taskQueue.push(task);
            return;
        }
        
        const selectedAgent = this.selectOptimalAgent(bestAgents);
        await selectedAgent.processTask(task);
    }
    
    private indexAgentCapabilities(agent: Agent): void {
        agent.capabilities.forEach(cap => {
            const agents = this.knowledgeGraph.get(cap.name) || new Set();
            agents.add(agent.id);
            this.knowledgeGraph.set(cap.name, agents);
        });
    }
    
    private removeFromKnowledgeGraph(agent: Agent): void {
        agent.capabilities.forEach(cap => {
            const agents = this.knowledgeGraph.get(cap.name);
            if (agents) {
                agents.delete(agent.id);
                if (agents.size === 0) {
                    this.knowledgeGraph.delete(cap.name);
                }
            }
        });
    }
    
    private findBestAgentsForTask(task: any): Agent[] {
        // Implement task-agent matching logic
        return Array.from(this.agents.values())
            .filter(agent => this.isAgentSuitableForTask(agent, task))
            .sort((a, b) => this.compareAgentSuitability(a, b, task));
    }
    
    private isAgentSuitableForTask(agent: Agent, task: any): boolean {
        // Implement agent-task suitability check
        return true; // Placeholder
    }
    
    private compareAgentSuitability(a: Agent, b: Agent, task: any): number {
        // Implement agent comparison logic for task suitability
        return 0; // Placeholder
    }
    
    private selectOptimalAgent(agents: Agent[]): Agent {
        // Implement optimal agent selection logic
        return agents[0]; // Placeholder
    }
    
    public getAgentById(id: UUID): Agent | undefined {
        return this.agents.get(id);
    }
    
    public getAgentsByCapability(capability: string): Agent[] {
        const agentIds = this.knowledgeGraph.get(capability) || new Set();
        return Array.from(agentIds)
            .map(id => this.agents.get(id))
            .filter((agent): agent is Agent => agent !== undefined);
    }
    
    public getConnectedAgents(agentId: UUID): Agent[] {
        const agent = this.agents.get(agentId);
        if (!agent) return [];
        
        return Array.from(agent.connections.keys())
            .map(id => this.agents.get(id))
            .filter((agent): agent is Agent => agent !== undefined);
    }
}
