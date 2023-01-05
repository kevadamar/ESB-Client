import axios from 'axios';

export const baseUrl = 'http://127.0.0.1:8000';

export const API = axios.create({
  baseURL: `${baseUrl}/api/v1/`,
});
