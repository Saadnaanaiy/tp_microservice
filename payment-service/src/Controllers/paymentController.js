const paymentService = require('../Services/paymentService');
exports.processPayment = (req, res) => {
  try {
    const result = paymentService.processPayment(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur paiement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
