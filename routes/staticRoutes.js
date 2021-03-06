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
router.get(
  '/book-appointment',
  requireAuth,
  staticController.book_appointment_get
);
router.post('/confirm-appointment', staticController.confirm_appointment_post);

router.get('/doctor', checkDoctor, staticController.doctor_get);
router.get('/patient', checkPatient, staticController.patient_get);

router.get('/final-payment', requireAuth, staticController.final_payment_get);
router.get(
  '/contact-consultancy',
  checkPatient,
  staticController.contact_consultancy_get
);

// router.get('/chat', staticController.chat_get);

module.exports = router;
