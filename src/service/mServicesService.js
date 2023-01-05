import { SERVICES } from '../utils/apiList';
import { API } from '../utils/config';

export const getListServices = async () => {
  try {
    const response = await API.get(SERVICES);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const storeService = async (payload) => {
  try {
    const response = await API.post(SERVICES, payload);
    return { error: false, status: 201, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const updateService = async (id, payload) => {
  try {
    const response = await API.put(`${SERVICES}/${id}`, payload);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const deleteService = async (id) => {
  try {
    const response = await API.delete(`${SERVICES}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
