import axios from 'axios';
import { EXPO_URL } from 'react-native-dotenv';

const api = axios.create({
   baseURL: EXPO_URL
});

export default api;
