const { getActiveAgentsStats } = require('../services/statsService');

async function getActiveAgents(req, res, next) {
  try {
    const result = await getActiveAgentsStats();
    res.json(result);
  } catch (err) { next(err); }
}

module.exports = { getActiveAgents };


