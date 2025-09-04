// frontend/src/services/api.js
import axios from 'axios';

// Use Vite-style environment variable (set by Render for static site builds).
// If VITE_API_BASE is defined it will be used, otherwise fallback to '/'.
const BASE = import.meta.env.VITE_API_BASE || '/';

export const api = axios.create({ baseURL: BASE });
export default api;

