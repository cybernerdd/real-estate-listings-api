const { Router } = require('express');
const listingRoutes = require('./listing');
const statsController = require('../controllers/statsController');

const router = Router();

router.use('/listings', listingRoutes);

router.get('/stats/active-agents', statsController.getActiveAgents);

router.get('/health', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;


