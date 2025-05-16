import kernex from '@kernex/client';

const KERNEX_APP_URL = import.meta.env.VITE_KERNEX_APP_URL;
const KERNEX_API_KEY = import.meta.env.VITE_KERNEX_API_KEY;

const client = kernex({
  appUrl: KERNEX_APP_URL,
  appApiKey: KERNEX_API_KEY,
});

export default client;