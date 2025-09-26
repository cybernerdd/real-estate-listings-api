const Joi = require('joi');

const listingSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  city: Joi.string().min(1).max(100).required(),
  price: Joi.number().precision(2).min(0).required(),
  bedrooms: Joi.number().integer().min(0).required(),
  agentId: Joi.number().integer().min(1).required(),
});

function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ error: true, message: error.details.map(d => d.message).join(', ') });
    }
    req.body = value;
    next();
  };
}

module.exports = { listingSchema, validateBody };


