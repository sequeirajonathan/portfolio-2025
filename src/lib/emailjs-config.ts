
const requiredEnvVars = {
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL,
};


const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  console.error('Please check your .env file and ensure all EmailJS variables are set.');
}

export const EMAILJS_CONFIG = {
  
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  
  
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  
  
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  
  
  TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL
};