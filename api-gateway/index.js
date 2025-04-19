require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use(cors());
app.use(morgan('dev'));
// En dur (sans passer par Consul) - à adapter si on veut tout passer en dynamique
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:3001';
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || 'http://localhost:3002';
const PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003';
app.use(
  '/users-service',
  createProxyMiddleware({ target: USER_SERVICE_URL, changeOrigin: true }),
);
app.use(
  '/orders-service',
  createProxyMiddleware({ target: ORDER_SERVICE_URL, changeOrigin: true }),
);
app.use(
  '/payments-service',
  createProxyMiddleware({ target: PAYMENT_SERVICE_URL, changeOrigin: true }),
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway démarré sur le port ${PORT}`);
});
