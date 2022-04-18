const { Router } = require('express');
const staticController = require('../controllers/staticController');

const router = Router();

router.get('/', staticController.home_get);
router.get('/about', staticController.about_get);
router.get('/contact', staticController.contact_get);
router.post('/send-contact-data', staticController.send_contact_data_post);

module.exports = router;
