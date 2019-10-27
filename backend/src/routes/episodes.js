const { Router } = require('express');

const { getEpisodes } = require('../models/episode');

const router = Router();

router.get('/', async (req, res) => {
    const response = {};
    try {
        const season = parseInt(req.query.season, 10);
        const filterOptions = { season };
        response.episodes = await getEpisodes(filterOptions);
    } catch (err) {
        response.error = true;
    }
    return res.json(response);
});

module.exports = router;
