const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => new Promise((resolve) => resolve(res.json({ episodes: [] }))));

module.exports = router;
