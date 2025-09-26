const { Router } = require('express');
const listingsController = require('../controllers/listingsController');
const { listingSchema, validateBody } = require('../middleware/validation');

const router = Router();

router.get('/', listingsController.list);
router.get('/:id', listingsController.get);
router.post('/', validateBody(listingSchema), listingsController.create);
router.put('/:id', validateBody(listingSchema), listingsController.update);
router.delete('/:id', listingsController.destroy);

module.exports = router;


