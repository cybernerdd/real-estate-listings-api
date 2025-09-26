const { toApiListing } = require('../utils/formatter');
const service = require('../services/listingsService');

async function list(req, res, next) {
  try {
    const rows = await service.getAllListings();
    res.json(rows.map(toApiListing));
  } catch (err) { next(err); }
}

async function get(req, res, next) {
  try {
    const row = await service.getListingById(req.params.id);
    if (!row) return res.status(404).json({ error: true, message: 'Listing not found' });
    res.json(toApiListing(row));
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const created = await service.createListing(req.body);
    res.status(201).json(toApiListing(created));
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const updated = await service.updateListing(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: true, message: 'Listing not found' });
    res.json(toApiListing(updated));
  } catch (err) { next(err); }
}

async function destroy(req, res, next) {
  try {
    const ok = await service.deleteListing(req.params.id);
    if (!ok) return res.status(404).json({ error: true, message: 'Listing not found' });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { list, get, create, update, destroy };


