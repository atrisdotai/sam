# Project Generator Documentation

## Overview
The Project Generator is a powerful feature of the SAM agent system that enables automatic generation of complete, production-ready Express.js API projects with TypeScript support. It leverages our agent network to plan, implement, and review the generated codebase.

## Quick Start
```bash
# Generate a new Express.js API project
pnpm --filter @sam/core generate my-express-api ./generated/my-express-api

# Navigate to the project directory
cd ./generated/my-express-api

# Install dependencies
npm install

# Start development server
npm run dev
```

## Generated Project Structure
```
my-express-api/
├── src/
│   ├── index.ts              # Main server file
│   └── routes/
│       └── users.ts          # User management routes
├── tests/
│   └── users.test.ts         # API endpoint tests
├── docs/                     # Project documentation
├── package.json             # Project configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Features

### 1. TypeScript Configuration
- Strict type checking enabled
- ESM module support
- Source maps for debugging
- Separate build output directory

### 2. Express.js Server
- Modular route structure
- Request body parsing
- Error handling
- Environment variable support

### 3. API Endpoints
The generated API includes a complete set of CRUD operations for user management:

| Method | Endpoint         | Description         |
|--------|-----------------|---------------------|
| GET    | /api/users      | Get all users       |
| GET    | /api/users/:id  | Get user by ID      |
| POST   | /api/users      | Create new user     |
| PUT    | /api/users/:id  | Update user         |
| DELETE | /api/users/:id  | Delete user         |

### 4. Input Validation
- Request body validation using express-validator
- Type checking for request parameters
- Proper error responses

### 5. Testing Infrastructure
- Jest test framework
- Supertest for API testing
- Example test cases included

## Agent System Integration

### PlannerAgent
The PlannerAgent is responsible for:
- Analyzing project requirements
- Defining project structure
- Creating a task plan for implementation

### DoerAgent
The DoerAgent handles:
- File and directory creation
- Code generation
- Dependency management
- Configuration setup

### ReviewerAgent
The ReviewerAgent performs:
- Code quality checks
- Type safety verification
- Best practices validation
- Documentation review

## Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Configuration

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Package Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.10",
    "@types/node": "^20.10.0",
    "@types/supertest": "^2.0.16",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.2"
  }
}
```

## Future Enhancements

### 1. Database Integration
- Support for multiple databases (PostgreSQL, MongoDB)
- Migration system
- Data seeding

### 2. Authentication & Authorization
- JWT authentication
- Role-based access control
- OAuth2 integration

### 3. Documentation
- OpenAPI/Swagger integration
- Automated API documentation
- JSDoc comments

### 4. Additional Features
- WebSocket support
- File upload handling
- Rate limiting
- Caching
- Docker configuration

## Contributing
To contribute to the project generator:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **TypeScript Compilation Errors**
   - Ensure all required types are installed
   - Check tsconfig.json configuration
   - Verify import/export syntax

2. **Runtime Errors**
   - Check for proper error handling
   - Verify environment variables
   - Ensure all dependencies are installed

3. **Test Failures**
   - Verify test environment setup
   - Check for proper test isolation
   - Ensure correct assertions

## Support
For issues and questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Contact the development team
