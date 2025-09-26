function formatPrice(price) {
  const numeric = Number(price ?? 0);
  return Number.isFinite(numeric) ? numeric.toFixed(2) : '0.00';
}

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function toApiListing(row) {
  return {
    id: row.id,
    title: row.title,
    city: capitalize(row.city),
    price: formatPrice(row.price),
    bedrooms: row.bedrooms,
    agentId: row.agentId,
  };
}

module.exports = { formatPrice, capitalize, toApiListing };



