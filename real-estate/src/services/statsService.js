const mongoose = require('mongoose');
const { connectMongo } = require('../config/database');

async function getActiveAgentsStats() {
  await connectMongo();
  const db = mongoose.connection.db;

  const agents = db.collection('agents');

  const pipeline = [
    { $match: { active: true } },
    {
      $lookup: {
        from: 'listings',
        localField: 'id',
        foreignField: 'agentId',
        as: 'agentListings',
        pipeline: [ { $match: { price: { $gt: 300000 } } } ],
      },
    },
    { $addFields: { listings: { $size: '$agentListings' } } },
    { $unwind: { path: '$agentListings', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'views',
        localField: 'agentListings.id',
        foreignField: 'listingId',
        as: 'listingViews',
      },
    },
    { $addFields: { listingViewsCount: { $sum: '$listingViews.count' } } },
    {
      $group: {
        _id: '$name',
        listings: { $first: '$listings' },
        totalViews: { $sum: { $ifNull: ['$listingViewsCount', 0] } },
      },
    },
    { $project: { _id: 0, agent: '$_id', listings: 1, totalViews: 1 } },
    { $sort: { totalViews: -1 } },
  ];

  const result = await agents.aggregate(pipeline).toArray();
  const namesInResult = new Set(result.map(r => r.agent));
  const allActiveAgents = await agents.find({ active: true }).project({ _id: 0, name: 1 }).toArray();
  for (const a of allActiveAgents) {
    if (!namesInResult.has(a.name)) {
      result.push({ agent: a.name, listings: 0, totalViews: 0 });
    }
  }

  result.sort((a, b) => b.totalViews - a.totalViews);
  return result;
}

module.exports = { getActiveAgentsStats };



