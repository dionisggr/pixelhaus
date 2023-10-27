const { VITE_API_KEY, VITE_API_URL_DEV: BASE_URL } = import.meta.env;

async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: {
      Authorization: 'Bearer' + VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function createProduct(data) {
  const response = await fetch(`${BASE_URL}/products`, {
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
  await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer' + VITE_API_KEY },
  });
}

async function uploadImage(data) {
  const response = await fetch(`${BASE_URL}/upload`, {
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
