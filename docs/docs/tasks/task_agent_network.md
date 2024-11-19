# Task: Sam Three-Agent System - 3 Hour Implementation

## Overview
Implement a focused three-agent system (Planner, Doer, Reviewer) for efficient task processing and execution.

## Core Components

### 1. Agent Roles
```typescript
interface AgentRole {
    type: 'planner' | 'doer' | 'reviewer';
    capabilities: string[];
    status: 'idle' | 'working' | 'waiting';
}
```

### 2. Task Processing Flow
```typescript
interface Task {
    id: UUID;
    type: string;
    status: 'planning' | 'execution' | 'review';
    priority: number;
    data: any;
    metadata: {
        created: Date;
        deadline?: Date;
        owner: UUID;
    };
}

interface TaskResult {
    id: UUID;
    taskId: UUID;
    status: 'success' | 'failure';
    output: any;
    metrics: {
        timeSpent: number;
        resourcesUsed: string[];
    };
}
```

### 3. Agent Communication
```typescript
interface AgentMessage {
    from: UUID;
    to: UUID;
    type: 'task' | 'result' | 'query' | 'update';
    content: any;
    timestamp: Date;
}
```

## Implementation Timeline (3 Hours)

### Hour 1: Core Setup (60 minutes)
- Agent base class implementation
- Task processing pipeline
- Basic communication system

### Hour 2: Agent Specialization (60 minutes)
- Planner agent implementation
- Doer agent implementation
- Reviewer agent implementation

### Hour 3: Integration & Testing (60 minutes)
- Agent coordination logic
- Basic UI for monitoring
- End-to-end testing

## Success Metrics
- Successful task processing through all three agents
- < 5 second response time for agent communication
- 95% task completion rate

## Integration Points

### 1. External Systems
```typescript
interface SystemConnectors {
    blockchain: {
        networks: Map<string, string[]>;  // Chain -> RPC endpoints
        contracts: Map<string, string>;   // Name -> Address
        events: Set<string>;              // Event signatures
    };
    development: {
        repositories: string[];           // GitHub repos
        ci_cd: Map<string, string>;      // Pipeline configs
        monitoring: string[];            // Alert endpoints
    };
    community: {
        platforms: Map<string, any>;     // Platform configs
        analytics: Map<string, string>; // Analytics endpoints
    };
}
```

### 2. Model Providers
```typescript
interface ModelProviders {
    openai: {
        key: string;  // sk-proj-r4F6_vtDezbYxP9KuIEBR9FzgT-...
        models: string[];
    };
    openrouter: {
        key: string;  // sk-or-v1-a49dc1c644eceefbb9e1c46ea6...
        endpoints: string[];
    };
    groq: {
        key: string;
        models: string[];
    };
}
```

## Project Generation System

The agent system has been extended to support automatic project generation, specifically for Express.js APIs with TypeScript. This functionality demonstrates the collaborative capabilities of our agent network:

### Agents Involved
- **PlannerAgent**: Plans the project structure and requirements
- **DoerAgent**: Implements the planned project structure and generates code
- **ReviewerAgent**: Reviews the generated project for completeness and quality

### Implementation Details
- Location: `packages/core/src/scripts/generate-project.ts`
- Command: `pnpm --filter @sam/core generate [project-name] [output-path]`

### Generated Project Features
- Full TypeScript support with proper type definitions
- Express.js server with RESTful API endpoints
- User management CRUD operations
- Input validation using express-validator
- Jest testing setup with supertest
- Development server with hot reload
- Production build configuration

### Current Status
✅ Successfully implemented and tested the following components:
1. Project generator script
2. Agent collaboration system
3. TypeScript configuration
4. Express.js API endpoints
5. Testing infrastructure

### Next Steps
1. Extend generator templates for different project types
2. Add support for database integration
3. Implement authentication and authorization
4. Add API documentation generation
5. Create more sophisticated agent interactions for complex project requirements

For detailed information about the project generator, see [Project Generator Documentation](../features/project_generator.md).

## Technical Requirements
```json
{
  "dependencies": {
    "@types/node": "^20.0.0",
    "web3": "^4.0.0",
    "ethers": "^6.0.0",
    "@octokit/rest": "^19.0.0",
    "discord.js": "^14.0.0",
    "twitter-api-v2": "^1.15.0",
    "@tensorflow/tfjs": "^4.0.0",
    "redis": "^4.0.0",
    "neo4j-driver": "^5.0.0",
    "bullmq": "^4.0.0"
  }
}
```

## Resources & Documentation
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Twitter API Documentation](https://developer.twitter.com/en/docs)