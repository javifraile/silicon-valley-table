const request = require('supertest');
const app = require('../src/app');

describe('Episodes List', () => {
    it('should get a list of episodes', async () => {
        const res = await request(app)
            .get('/episodes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('episodes');

        const {episodes} = res.body;
        expect(episodes.length).toEqual(38);
        expect(episodes[0].title).toEqual("Minimum Viable Product");
        let episodeCounter = 0;
        for (const episode of episodes) {
            let season;
            if (episodeCounter < 8) {
                season = 1;
            } else if (episodeCounter < 18) {
                season = 2;
            } else if (episodeCounter < 28) {
                season = 3;
            } else if (episodeCounter < 38) {
                season = 4;
            }
            expect(episode.season).toEqual(season);
            episodeCounter++;
        }
        for (let season = 1; season <= 4; season++) {
            const seasonEpisodes = season === 1 ? 8 : 10;
            expect(episodes.filter((episode) => episode.season === season).length).toEqual(seasonEpisodes);
        }
    });

    it('should filter episodes by season', async () => {
        for (let season = 1; season <= 4; season++) {
            const seasonEpisodes = season === 1 ? 8 : 10;
            const res = await request(app)
                .get(`/episodes?season=${season}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('episodes');

            const {episodes} = res.body;
            expect(episodes.length).toEqual(seasonEpisodes);
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