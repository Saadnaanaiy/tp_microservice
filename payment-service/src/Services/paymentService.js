function processPayment(paymentData) {
  // Simule un paiement réussi
  return {
    orderId: paymentData.orderId,
    amount: paymentData.amount,
    status: 'PAID',
  };
}
module.exports = {
  processPayment,
};
