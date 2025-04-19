import React, { useState } from 'react';
function App() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [orderProduct, setOrderProduct] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [logs, setLogs] = useState([]);
  const gatewayUrl = 'http://localhost:3000'; // l'URL de l'API Gateway

  const createUser = async () => {
    try {
      const response = await fetch(`${gatewayUrl}/users-service/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail }),
      });
      const data = await response.json();
      setLogs((prev) => [...prev, `User created: ${JSON.stringify(data)}`]);
    } catch (err) {
      console.error(err);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(`${gatewayUrl}/orders-service/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // fixons un userId = 1 pour l'exemple
          product: orderProduct,
          amount: parseFloat(orderAmount)
        }),
      });
      const data = await response.json();
      setLogs((prev) => [...prev, `Order created: ${JSON.stringify(data)}`]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>Mini E-Commerce</h1>
      <section>
        <h2>Créer un utilisateur</h2>
        <input
          placeholder="Nom"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button onClick={createUser}>Créer</button>
      </section>
      <section>
        <h2>Créer une commande</h2>
        <input
          placeholder="Produit"
          value={orderProduct}
          onChange={(e) => setOrderProduct(e.target.value)}
        />
        <input
          placeholder="Montant"
          value={orderAmount}
          onChange={(e) => setOrderAmount(e.target.value)}
        />
        <button onClick={createOrder}>Commander</button>
      </section>
      <section>
        <h2>Logs</h2>
        <pre>{logs.join('\n')}</pre>
      </section>
    </div>
  );
}
export default App;
