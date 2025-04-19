// orderController.js
const orderService = require('../Services/orderService');
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getOrderById = (req, res) => {
  const order = orderService.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  res.json(order);
};
