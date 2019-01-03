import axios from 'axios';
export const API = axios.create({
  baseURL: `http://172.16.110.189/api`
});
