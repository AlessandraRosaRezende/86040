document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.getElementById('orders');

  if (!ordersContainer) {
    console.error('Orders container element not found');
    return;
  }

  const ordersList = document.createElement('ul');
  ordersList.id = 'orders-list';
  ordersContainer.appendChild(ordersList);

  fetch('http://localhost:8080/api/orders')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.result.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `Order ID: ${order._id} - Total: R$${order.totalPrice},00 - Status: ${order.status}`;
        ordersList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      ordersList.textContent = 'Failed to load orders.';
    });
});
