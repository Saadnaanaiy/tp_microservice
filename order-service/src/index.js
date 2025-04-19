require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const Consul = require('consul');
const consul = new Consul({
  host: process.env.CONSUL_HOST || 'localhost',
  port: process.env.CONSUL_PORT || '8500',
});
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
// Health check
app.get('/health', (req, res) => {
  res.send('OK');
});
app.use('/orders', orderRoutes);
const PORT = process.env.PORT || 3002;
const SERVICE_NAME = 'order-service';
const SERVICE_ID = `${SERVICE_NAME}-${uuidv4()}`;
app.listen(PORT, () => {
  console.log(`order-service démarré sur le port ${PORT}`);
  // Enregistrement dans Consul
  consul.agent.service.register(
    {
      name: SERVICE_NAME,
      id: SERVICE_ID,
      address: 'host.docker.internal',
      port: Number(PORT),
      check: {
        http: `http://host.docker.internal:${PORT}/health`,
        interval: '10s',
      },
    },
    (err) => {
      if (err) {
        console.error('Erreur enregistrement Consul:', err);
      } else {
        console.log(
          `Service ${SERVICE_NAME} enregistré dans Consul avec ID ${SERVICE_ID}`,
        );
      }
    },
  );
});
// Désenregistrement
process.on('SIGINT', async () => {
  console.log('Arrêt order-service...');
  try {
    await consul.agent.service.deregister(SERVICE_ID);
    console.log('order-service désenregistré de Consul');
  } catch (err) {
    console.error('Erreur de désenregistrement Consul:', err);
  }
  process.exit();
});
