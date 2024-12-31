import axios from 'axios';

// Configuração da URL base da API
const API_URL = 'http://localhost:8080/api';

// Função para fazer uma requisição POST
export const post = async (rota, formData) => {

  try {
    const response = await axios.post(`${API_URL}/${rota}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para fazer uma requisição GET
export const get = async (rota) => {
  try {
    const response = await axios.get(`${API_URL}/${rota}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer a requisição GET:', error.response ? error.response.data : error.message);
    throw error;
  }
};