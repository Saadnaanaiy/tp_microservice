// order-service/src/consulHelper.js
const Consul = require('consul');
const consul = new Consul({
  host: process.env.CONSUL_HOST || 'localhost',
  port: process.env.CONSUL_PORT || '8500',
});
async function getPaymentServiceUrl() {
  console.log('Getting payment service URL...');
  let serviceInfo = await consul.catalog.service.nodes('payment-service');
  const address = serviceInfo[0].ServiceAddress;
  const port = serviceInfo[0].ServicePort;
  const serviceURL = `http://localhost:${port}`;
  return serviceURL;
}
module.exports = {
  getPaymentServiceUrl,
};
