import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const userRouter = express.Router();

interface User {
    id: string;
    name: string;
    email: string;
}

interface CreateUserRequest {
    name: string;
    email: string;
}

interface UpdateUserRequest {
    name?: string;
    email?: string;
}

const users: User[] = [];

// Get all users
userRouter.get('/', (_req: Request, res: Response) => {
    res.json(users);
});

// Get user by ID
userRouter.get('/:id', (req: Request, res: Response) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create user
userRouter.post('/',
    body('name').isString().trim().notEmpty(),
    body('email').isEmail(),
    (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser: User = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email
        };

        users.push(newUser);
        res.status(201).json(newUser);
    }
);

// Update user
userRouter.put('/:id',
    body('name').optional().isString().trim().notEmpty(),
    body('email').optional().isEmail(),
    (req: Request<{ id: string }, {}, UpdateUserRequest>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userIndex = users.findIndex(u => u.id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[userIndex] = {
            ...users[userIndex],
            ...req.body
        };

        res.json(users[userIndex]);
    }
);

// Delete user
userRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});
