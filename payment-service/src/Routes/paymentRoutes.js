const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');
// POST /payments
router.post('/', paymentController.processPayment);
module.exports = router;
