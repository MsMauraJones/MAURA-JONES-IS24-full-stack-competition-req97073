import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/assignment');
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/create-product', formData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
};
