const { Router } = require('express');
const staticController = require('../controllers/staticController');
const {
  requireAuth,
  checkDoctor,
  checkPatient,
} = require('../middleware/authMiddleware');

const router = Router();

router.get('/', staticController.home_get);
router.get('/about', staticController.about_get);
router.get('/contact', staticController.contact_get);
router.post('/send-contact-data', staticController.send_contact_data_post);

router.get('/doctor', checkDoctor, staticController.doctor_get);
router.get('/patient', checkPatient, staticController.patient_get);

router.get('/final-payment', requireAuth, staticController.final_payment_get);
router.get('/contact-consultancy', staticController.contact_consultancy_get);

module.exports = router;
