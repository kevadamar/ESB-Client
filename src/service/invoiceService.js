import { INVOICES, ISSUED_INVOICE, PAID_INVOICES } from '../utils/apiList';
import { API } from '../utils/config';

export const getListInvoices = async () => {
  try {
    const response = await API.get(INVOICES);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const geInvoice = async (id) => {
  try {
    const response = await API.get(`${INVOICES}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const storeInvoice = async (payload) => {
  try {
    const response = await API.post(INVOICES, payload);
    return { error: false, status: 201, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const updateInvoice = async (id, payload) => {
  try {
    const response = await API.put(`${INVOICES}/${id}`, payload);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await API.delete(`${INVOICES}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const issuedInvoice = async (id) => {
  try {
    const response = await API.get(`${ISSUED_INVOICE}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};

export const flagPaidInvoice = async (flagPaid, id) => {
  try {
    const response = await API.get(`${PAID_INVOICES}/${flagPaid}/${id}`);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
