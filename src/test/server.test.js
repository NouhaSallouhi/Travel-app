//testing the server response
const request = require('supertest');

    test('Page response successfully.', async () => {
        const response = await request('http://localhost:8080').get('/');
        expect(response.statusCode).toBe(200);
    });
