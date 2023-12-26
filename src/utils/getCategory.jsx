export const getCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const json = await response.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
  
      return json;
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw error; // Propaga el error para que el llamador pueda manejarlo
    }
};
