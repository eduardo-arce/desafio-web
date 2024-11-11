import apiClient from '../config/axios';

export const getUserData = async () => {
  try {
    const response = await apiClient.get('/WeatherForecast/Users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};


export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/User/ConsultChart');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};

export const getTableData = async () => {
  try {
    const response = await apiClient.get('/User/ConsultChart');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};