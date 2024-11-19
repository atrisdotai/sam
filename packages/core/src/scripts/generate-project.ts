import { PlannerAgent } from '../agents/PlannerAgent';
import { DoerAgent } from '../agents/DoerAgent';
import { ReviewerAgent } from '../agents/ReviewerAgent';
import { Task } from '../types/task';
import { UUID } from '../types/common';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateProject(projectName: string, outputPath: string, framework: string) {
    console.log('\n🚀 Starting project generation...');

    // Initialize agents
    const planner = new PlannerAgent('planner-1' as UUID, 'Project Planner');
    const doer = new DoerAgent('doer-1' as UUID, 'Project Generator');
    const reviewer = new ReviewerAgent('reviewer-1' as UUID, 'Project Reviewer');

    // Create the project generation task
    const task: Task = {
        id: `generate-${projectName}`,
        type: 'project',
        data: {
            description: `Create a ${projectName} project with ${framework} framework`,
            requirements: [
                'Project structure with src, tests, and docs directories',
                `${framework} server with TypeScript`,
                'Basic CRUD API endpoints',
                'Proper configuration files',
                'README with setup instructions'
            ],
            outputPath: outputPath,
            framework: framework
        }
    };

    try {
        // 1. Planning phase
        console.log('\n📋 Planning project structure...');
        const planResult = await planner.processTask(task);

        // 2. Implementation phase
        console.log('\n🏗️  Generating project files...');
        const implementationResult = await doer.processTask({
            ...task,
            plan: planResult.plan
        });

        // 3. Review phase
        console.log('\n🔍 Reviewing generated project...');
        const reviewResult = await reviewer.processTask({
            ...task,
            implementation: implementationResult.result
        });

    } catch (error) {
        console.error('❌ Error generating project:', error);
    } finally {
        // Cleanup
        await planner.shutdown();
        await doer.shutdown();
        await reviewer.shutdown();
    }
}

// Get command line arguments
const projectName = process.argv[2] || 'express-api';
const outputPath = process.argv[3];
const framework = process.argv[4] || 'express'; // Default to express if not specified

if (!outputPath) {
    console.error('Please provide an output path');
    process.exit(1);
}

// Get absolute path for output
const baseDir = process.cwd();
const absoluteOutputPath = path.resolve(baseDir, outputPath);

console.log('Base directory:', baseDir);
console.log('Output path:', absoluteOutputPath);

// Create the output directory if it doesn't exist
if (!fs.existsSync(absoluteOutputPath)) {
    fs.mkdirSync(absoluteOutputPath, { recursive: true });
}

// Generate the project
generateProject(projectName, absoluteOutputPath, framework)
    .then(() => {
        console.log('\n✨ Project generation completed!');
        console.log(`📁 Project created at: ${absoluteOutputPath}\n`);
        console.log('📝 Next steps:');
        console.log('1. cd into the project directory');
        console.log('2. npm install');
        console.log('3. npm run dev');
    })
    .catch((error) => {
        console.error('Error generating project:', error);
        process.exit(1);
    });
