const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://leyinvest-backend.onrender.com/api/v1',
} as const;

export default env;