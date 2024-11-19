import request from 'supertest';
import app from '../src/index';

describe('User API', () => {
    beforeEach(() => {
        // Clear any test data
        jest.clearAllMocks();
    });

    it('should create a new user', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const res = await request(app)
            .post('/api/users')
            .send(userData);
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(userData.name);
        expect(res.body.email).toBe(userData.email);
    });

    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
