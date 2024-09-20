// src/config.ts
import {Platform} from 'react-native';

const baseUrl =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

export default {
  baseUrl,
  endpoints: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    changePassword: '/api/auth/change_password',
    forgotPassword: '/api/auth/forgot_password',
    getNote: 'api/notes/getNotes',
    addNote: 'api/notes/addNote',
    updateNote: 'api/notes/updateNote',
    deleteNote: 'api/notes/deleteNote',
  },
};
