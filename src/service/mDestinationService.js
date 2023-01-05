import { DESTINATIONS } from '../utils/apiList';
import { API } from '../utils/config';

export const getListDestinations = async () => {
  try {
    const response = await API.get(DESTINATIONS);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const storeDestination = async (payload) => {
  try {
    const response = await API.post(DESTINATIONS, payload);
    return { error: false, status: 201, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const updateDestination = async (id, payload) => {
  try {
    const response = await API.put(`${DESTINATIONS}/${id}`, payload);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await API.delete(`${DESTINATIONS}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
