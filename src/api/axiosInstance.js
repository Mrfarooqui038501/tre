import axios from 'axios';
import { TRELLO_CONFIG } from './index';

const api = axios.create({
  baseURL: TRELLO_CONFIG.BASE_URL,
  params: {
    key: TRELLO_CONFIG.API_KEY,
    token: TRELLO_CONFIG.TOKEN,
  },
});

export default api;
