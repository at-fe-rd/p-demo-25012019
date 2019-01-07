import axios from 'axios';
import { environment } from '../../../src/environments/environment';
export const API = axios.create({
  baseURL: environment.baseURL
});
