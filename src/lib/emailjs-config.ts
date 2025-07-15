// Validate that all required environment variables are present
const requiredEnvVars = {
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  console.error('Please check your .env file and ensure all EmailJS variables are set.');
}

export const EMAILJS_CONFIG = {
  // Your EmailJS public key (found in Account > API Keys)
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  
  // Your EmailJS service ID (found in Email Services)
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  
  // Your EmailJS template ID (found in Email Templates)
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  
  // Your email address where you want to receive messages
  TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL
};