const { connectMySQL } = require('../config/database');

function toDbListing(body) {
  return {
    title: body.title,
    city: String(body.city || '').toLowerCase(),
    price: body.price,
    bedrooms: body.bedrooms,
    agentId: body.agentId,
  };
}

async function getAllListings() {
  const pool = await connectMySQL();
  const [rows] = await pool.query('SELECT id, title, city, price, bedrooms, agentId FROM listings');
  return rows;
}

async function getListingById(id) {
  const pool = await connectMySQL();
  const [rows] = await pool.query('SELECT id, title, city, price, bedrooms, agentId FROM listings WHERE id = ?', [id]);
  return rows[0] || null;
}

async function createListing(payload) {
  const pool = await connectMySQL();
  const toInsert = toDbListing(payload);
  const [result] = await pool.query(
    'INSERT INTO listings (title, city, price, bedrooms, agentId) VALUES (?, ?, ?, ?, ?)',
    [toInsert.title, toInsert.city, toInsert.price, toInsert.bedrooms, toInsert.agentId]
  );
  return await getListingById(result.insertId);
}

async function updateListing(id, payload) {
  const pool = await connectMySQL();
  const toUpdate = toDbListing(payload);
  const [result] = await pool.query(
    'UPDATE listings SET title = ?, city = ?, price = ?, bedrooms = ?, agentId = ? WHERE id = ?',
    [toUpdate.title, toUpdate.city, toUpdate.price, toUpdate.bedrooms, toUpdate.agentId, id]
  );
  if (result.affectedRows === 0) return null;
  return await getListingById(id);
}

async function deleteListing(id) {
  const pool = await connectMySQL();
  const [result] = await pool.query('DELETE FROM listings WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};


