import {
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
  } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { useState, memo } from "react";
  import type { FC, FormEvent } from "react";
  import { motion } from "framer-motion";
  import emailjs from 'emailjs-com';
  import { EMAILJS_CONFIG } from '@/lib/emailjs-config';

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  export const ContactSection: FC = memo(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      message: ''
    });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const resetForm = () => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (isSubmitting) return;

      // Basic validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setSubmitStatus('error');
        setStatusMessage('Please fill in all fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitStatus('error');
        setStatusMessage('Please enter a valid email address.');
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus('idle');
      setStatusMessage('');

      try {
        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        const templateParams = {
          name: formData.name,         
          email: formData.email,      
          message: formData.message,   
          to_email: EMAILJS_CONFIG.TO_EMAIL,
          time: new Date().toLocaleString(), 
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        resetForm();
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 5000);
      } catch (error) {
        console.error('Email send error:', error);
        setSubmitStatus('error');
        setStatusMessage('Failed to send message. Please try again or contact me directly.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <motion.section
        id="contact"
        className="py-12 sm:py-16 md:py-24 px-4 relative bg-secondary/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
            Open to Opportunities <span className="text-primary">— Let's Connect</span>
          </h2>
  
          <p className="text-center text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            I'm Jonathan Sequeira, a Lead Software Engineer with 7+ years of experience in fintech and SaaS. I specialize in React, TypeScript, Node.js, and cloud platforms. I'm passionate about clean code, developer experience, and practical architecture. I'm currently seeking new opportunities to contribute my skills and experience to a forward-thinking team.
          </p>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-center lg:text-left">
                Contact Information
              </h3>
  
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm md:text-base mb-1">Email</h4>
                    <a
                      href="mailto:sequeira.dev@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base break-all"
                    >
                      sequeira.dev@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm md:text-base mb-1">Phone</h4>
                    <a
                      href="tel:+19545405276"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
                    >
                      (954) 540-5276
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm md:text-base mb-1">Location</h4>
                    <span className="text-muted-foreground text-sm md:text-base">
                      Conroe, TX, United States
                    </span>
                  </div>
                </div>
              </div>
  
              <div className="pt-6 md:pt-8 flex flex-col items-center w-full text-center">
                <h4 className="font-medium mb-4 text-sm md:text-base">Connect With Me</h4>
                
                {/* Mobile Style - Stacked with labels */}
                <div className="flex flex-col space-y-3 w-full sm:hidden">
                  <a 
                    href="https://www.linkedin.com/in/jonathan-s-4165a5127/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/sequeirajonathan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </div>

                {/* Desktop Style - Side by side icons */}
                <div className="hidden sm:flex justify-center space-x-6 w-full">
                  <a 
                    href="https://www.linkedin.com/in/jonathan-s-4165a5127/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                  </a>
                  <a 
                    href="https://github.com/sequeirajonathan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
  
            <motion.div
              className="bg-card p-4 sm:p-6 md:p-8 rounded-lg shadow-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"> Send a Message</h3>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <motion.div 
                  className={`mb-4 p-3 rounded-md text-sm ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    {submitStatus === 'success' ? (
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{statusMessage}</span>
                  </div>
                </motion.div>
              )}
  
              <form className="space-y-3 sm:space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    placeholder="Jonathan Sequeira..."
                  />
                </div>
  
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    placeholder="john@gmail.com"
                  />
                </div>
  
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
  
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "cosmic-button w-full flex items-center justify-center gap-2 text-sm sm:text-base",
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  });