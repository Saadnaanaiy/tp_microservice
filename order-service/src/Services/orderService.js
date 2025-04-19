const axios = require('axios');
const amqp = require('amqplib');
const { getPaymentServiceUrl } = require('../consulHelper');
let orders = []; // Stock en mémoire pour l'exemple
async function createOrder(data) {
// 1) Créer la commande localement
const newOrder = {
id: orders.length + 1,
userId: data.userId,
product: data.product,
amount: data.amount,
status: 'PENDING',
};
orders.push(newOrder);
// 2) Découvrir dynamiquement l'URL du payment-service
let paymentUrl;
try {
const baseUrl = await getPaymentServiceUrl();
paymentUrl = `${baseUrl}/payments`;
console.log(paymentUrl)
} catch (error) {
console.error('Impossible de trouver payment-service:', error);
newOrder.status = 'PAYMENT_SERVICE_UNAVAILABLE';
return newOrder;
}
// 3) Appel REST synchrone vers payment-service
try {
const response = await axios.post(paymentUrl, {
orderId: newOrder.id,
amount: newOrder.amount
});
newOrder.status = response.data.status; // ex: "PAID"
} catch (error) {
console.error('Erreur lors de l’appel payment-service:', error.message);
newOrder.status = 'PAYMENT_FAILED';
}
// 4) Notification asynchrone (RabbitMQ)
await sendOrderNotification(newOrder);
return newOrder;
}
function getOrderById(id) {
return orders.find(o => o.id === parseInt(id));
}
async function sendOrderNotification(order) {
try {
const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost');
const channel = await connection.createChannel();
const queue = 'order_notifications';
await channel.assertQueue(queue, { durable: false });
channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
console.log('Notification envoyée:', order);
await channel.close();
await connection.close();
} catch (error) {
console.error('Erreur envoi notification RabbitMQ:', error);
}
}
module.exports = {
createOrder,
getOrderById,
};
