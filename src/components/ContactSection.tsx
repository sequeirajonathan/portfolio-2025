import {
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
  } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { useToast } from "@/hooks/use-toast";
  import { useState, FC, FormEvent, memo } from "react";
  import { motion } from "framer-motion";
  
  export const ContactSection: FC = memo(() => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      setIsSubmitting(true);
  
      setTimeout(() => {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setIsSubmitting(false);
      }, 1500);
    };
    return (
      <motion.section
        id="contact"
        className="py-24 px-4 relative bg-secondary/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Open to Opportunities <span className="text-primary">— Let's Connect</span>
          </h2>
  
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm Jonathan Sequeira, a Lead Software Engineer with 7+ years of experience in fintech and SaaS. I specialize in React, TypeScript, Node.js, and cloud platforms. I'm passionate about clean code, developer experience, and practical architecture. I'm currently seeking new opportunities to contribute my skills and experience to a forward-thinking team.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
  
              <div className="space-y-6 justify-center">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium"> Email</h4>
                    <a
                      href="mailto:sequeira.s.jonathan@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sequeira.s.jonathan@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium"> Phone</h4>
                    <a
                      href="tel:+19545405276"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (954) 540-5276
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium"> Location</h4>
                    <span className="text-muted-foreground">
                      Conroe, TX, United States
                    </span>
                  </div>
                </div>
              </div>
  
              <div className="pt-8">
                <h4 className="font-medium mb-4"> Connect With Me</h4>
                <div className="flex space-x-4 justify-center">
                  <a href="https://www.linkedin.com/in/jonathan-s-4165a5127/" target="_blank" rel="noopener noreferrer">
                    <Linkedin />
                  </a>
                  <a href="https://github.com/sequeirajonathan" target="_blank" rel="noopener noreferrer">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
  
            <motion.div
              className="bg-card p-8 rounded-lg shadow-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>
  
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
  
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "cosmic-button w-full flex items-center justify-center gap-2"
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  });