import axios from 'axios';
import { environment } from '../../../src/env';
export const API = axios.create({
  baseURL: environment.baseURL
});
