import axios from 'axios';

export default axios.create({
  baseURL: `http://172.16.110.189/api`
});
