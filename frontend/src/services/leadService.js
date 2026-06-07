import axios from "axios";

const API_URL = "http://localhost:8000/api/leads";

export const getLeads = () => axios.get(API_URL);

export const createLead = (data) =>
  axios.post(API_URL, data);

export const updateLead = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteLead = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const searchLeads = (query) =>
  axios.get(`${API_URL}/search?q=${query}`);

export const getStats = () =>
  axios.get(`${API_URL}/stats`);