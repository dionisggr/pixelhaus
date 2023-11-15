const { VITE_API_KEY, VITE_API_URL_DEV, VITE_API_URL_PROD, VITE_ENV } =
  import.meta.env;
const BASE_API_URL =
  VITE_ENV === 'production' ? VITE_API_URL_PROD : VITE_API_URL_DEV;

async function getProducts() {
  const response = await fetch(`${BASE_API_URL}/arts`, {
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function getUserOrders(user_id) {
  const response = await fetch(`${BASE_API_URL}/${user_id}/orders`, {
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function getAllOrders() {
  const response = await fetch(`${BASE_API_URL}/orders`, {
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function createProduct(data) {
  const response = await fetch(`${BASE_API_URL}/arts`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function deleteProduct(id) {
  await fetch(`${BASE_API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer' + VITE_API_KEY },
  });
}

async function uploadImage(data) {
  const response = await fetch(`${BASE_API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function getNotifications() {
  const response = await fetch(`${BASE_API_URL}/notifications`, {
    headers: { Authorization: 'Bearer' + VITE_API_KEY },
  });

  return await response.json();
}

async function sendNotification(notification) {
  const response = await fetch(`${BASE_API_URL}/notifications`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  });

  return await response.json();
}

async function getCart() {
  const response = await fetch(`${BASE_API_URL}/cart`, {
    headers: { Authorization: 'Bearer' + VITE_API_KEY },
  });

  return await response.json();
}

export default {
  getProducts,
  createProduct,
  deleteProduct,
  uploadImage,
  getNotifications,
  getCart,
  getUserOrders,
  getAllOrders,
  sendNotification,
};
