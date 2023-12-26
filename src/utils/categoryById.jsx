export const getCategoryById = async (categoryId) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      const json = await response.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
  
      return json;
    } catch (error) {
      console.error(`Error fetching category "${categoryId}":`, error.message);
      throw error;
    }
  };