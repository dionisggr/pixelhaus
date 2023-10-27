const { VITE_API_KEY, VITE_API_URL_DEV, VITE_API_URL_PROD, VITE_ENV } = import.meta.env;
const BASE_API_URL = VITE_ENV ? VITE_API_URL_PROD : VITE_API_URL_DEV;

async function getProducts() {
  const response = await fetch(`${BASE_API_URL}/products`, {
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function createProduct(data) {
  const response = await fetch(`${BASE_API_URL}/products`, {
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

export default { getProducts, createProduct, deleteProduct, uploadImage };
