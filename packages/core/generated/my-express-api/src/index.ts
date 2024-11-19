import express from 'express';
import { userRouter } from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
