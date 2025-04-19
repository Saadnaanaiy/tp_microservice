const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Middleware to validate ID parameter
const validateIdParam = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID utilisateur invalide' });
  }
  req.validatedId = id;
  next();
};

// Health check endpoint for users service
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'users-service' });
});

// User endpoints
router.post('/', userController.createUser);
router.get('/:id', validateIdParam, userController.getUserById);

// Global error handler for this router
router.use((err, req, res, next) => {
  console.error('Route error:', err);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: err.message,
  });
});

module.exports = router;
