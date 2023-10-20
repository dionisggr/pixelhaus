const BASE_URL = 'https://api.printify.com/v1';
const { VITE_PRINTIFY_SHOP_ID, VITE_PRINTIFY_API_TOKEN } = import.meta.env;

async function fetchWithToken(endpoint, options) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${VITE_PRINTIFY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
}

async function getProducts() {
  const endpoint = `/shops/${VITE_PRINTIFY_SHOP_ID}/products.json`;
  const { data } = await fetchWithToken(endpoint);

  return data.map(({ id, description, tags, images, updated_at }) => {
    images = images.map(({ src }) => src);

    return {
      id,
      description,
      tags,
      images,
      updated_at,
      isAdded: false,
      flipped: false,
      selected: {
        material: 'Canvas',
        size: 'Large',
        duration: '6-Months',
      },
    };
  });
}

async function updateProduct(productData) {
  const endpoint = `/shops/${VITE_PRINTIFY_SHOP_ID}/products/${productData.id}.json`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(productData),
  };

  return await fetchWithToken(endpoint, options);
}

async function createProduct(productData) {
  const endpoint = `/shops/${VITE_PRINTIFY_SHOP_ID}/products.json`;
  const options = {
    method: 'POST',
    body: JSON.stringify(productData),
  };

  return await fetchWithToken(endpoint, options);
}

async function deleteProduct(productId) {
  const endpoint = `/shops/${VITE_PRINTIFY_SHOP_ID}/products/${productId}.json`;

  return await fetchWithToken(endpoint, { method: 'DELETE' });
}

export default { getProducts, updateProduct, createProduct, deleteProduct };
