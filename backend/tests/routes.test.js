const request = require('supertest');
const app = require('../src/app');

describe('Episodes List', () => {
    it('should get a list of episodes', async () => {
        const res = await request(app)
            .get('/episodes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('episodes');
    });

    it('should filter episodes by season', async () => {
        for (let season = 1; season <= 4; season++) {
            const res = await request(app)
                .get(`/episodes?season=${season}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('episodes');
        }
    });

    it('should return 0 episodes when there is no match for season', async () => {
        const res = await request(app)
            .get('/episodes?season=8');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('episodes');
        expect(res.body.episodes.length).toEqual(0);
    });
});


describe('Error 404', () => {
    it('should throw an error', async () => {
        const res = await request(app)
            .get('/season');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Not Found');
    });
});