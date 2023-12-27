// Función para obtener los datos del almacenamiento local
export const getLocalStorageData = () => {
  try {
    const data = localStorage.getItem('online');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing local storage data:', error);
    return null;
  }
};