export const deleteProductById = async (productId) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`Error deleting product with ID ${productId}: ${response.statusText}`);
    }
  
    return response.json();
  };