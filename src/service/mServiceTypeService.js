import { SERVICE_TYPES } from '../utils/apiList';
import { API } from '../utils/config';

export const getListServiceTypes = async () => {
  try {
    const response = await API.get(SERVICE_TYPES);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const storeServiceType = async (payload) => {
  try {
    const response = await API.post(SERVICE_TYPES, payload);
    return { error: false, status: 201, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const updateServiceType = async (id, payload) => {
  try {
    const response = await API.put(`${SERVICE_TYPES}/${id}`, payload);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const deleteServiceType = async (id) => {
  try {
    const response = await API.delete(`${SERVICE_TYPES}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
