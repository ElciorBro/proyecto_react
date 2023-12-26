export const saveUserData = (userData) => {
  try {
    const jsonString = JSON.stringify(userData);

    // Guardar en el localStorage
    localStorage.setItem('userData', jsonString);

    console.log('Datos de usuario guardados en el localStorage.');
  } catch (error) {
    console.error('Error al guardar datos en el localStorage:', error);
  }
};


export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};