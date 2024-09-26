import axios from 'axios';
import config from './config';

const apiClient = axios.create({
  baseURL: config.baseUrl,
});

// API service methods
const ApiService = {
  register: (userData: {name: string; email: string; password: string}) => {
    return apiClient.post(config.endpoints.register, userData);
  },
  login: (userData: {email: string; password: string}) => {
    return apiClient.post(config.endpoints.login, userData);
  },
  logout: () => {
    return apiClient.post(config.endpoints.logout);
  },
  changePassword: (data: {currentPassword: string; newPassword: string}) => {
    return apiClient.post(config.endpoints.changePassword, data);
  },
  forgotPassword: (email: string) => {
    return apiClient.post(config.endpoints.forgotPassword, {email});
  },
  getNotes: () => {
    return apiClient.get(config.endpoints.getNotes);
  },
  addNote: (noteData: {title: string; content: string}) => {
    return apiClient.post(config.endpoints.addNote, noteData);
  },
  updateNote: (noteId: string, noteData: {title: string; content: string}) => {
    return apiClient.put(`${config.endpoints.updateNote}/${noteId}`, noteData);
  },
  deleteNote: (noteId: string) => {
    return apiClient.delete(`${config.endpoints.deleteNote}/${noteId}`);
  },
};

export default ApiService;
