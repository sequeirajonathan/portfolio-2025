import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

export const NotFound = memo(() => {
  return (
    <div 
      className="min-h-screen text-foreground flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, #000 35%, #733000 45%, #000 75%)
        `
      }}
    >
      {/* Multiple black hole effects using radial gradients */}
      {[...Array(3)].map((_, blackHoleIndex) => (
        <div 
          key={blackHoleIndex}
          className="absolute rounded-full"
          style={{
            left: `${20 + blackHoleIndex * 30}%`,
            top: `${20 + blackHoleIndex * 20}%`,
            width: '300px',
            height: '300px',
            backgroundImage: `
              radial-gradient(circle at center, #000 35%, #733000 45%, #000 75%)
            `,
            filter: 'blur(1px)',
          }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: 360,
            }}
            transition={{
              duration: 8 + blackHoleIndex * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Multiple rings for each black hole */}
            {[...Array(5)].map((_, ringIndex) => (
              <motion.div
                key={ringIndex}
                className="absolute rounded-full border border-orange-600/40"
                style={{
                  inset: `${ringIndex * 12}px`,
                }}
                animate={{
                  scale: [1, 1.2 + ringIndex * 0.1, 1],
                  opacity: [0.2, 0.6 - ringIndex * 0.1, 0.2],
                }}
                transition={{
                  duration: 3 + ringIndex * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ringIndex * 0.3,
                }}
              />
            ))}
            
            {/* Black hole center with gradient */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: '60px',
                backgroundImage: `
                  radial-gradient(circle at center, #000 0%, #000 60%, #733000 80%, #000 100%)
                `,
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Particle effects around each black hole */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-500 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  x: [0, Math.cos((i * 45) * Math.PI / 180) * 120],
                  y: [0, Math.sin((i * 45) * Math.PI / 180) * 120],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2 + blackHoleIndex * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      ))}

      {/* Additional floating rings with gradient effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundImage: `
              radial-gradient(circle at center, transparent 60%, #733000 80%, transparent 100%)
            `,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content positioned to the side of black hole */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-600/30"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-orange-500 mb-4 drop-shadow-lg">
            404
          </h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Page Lost in Space
          </motion.h2>
          
          <motion.p
            className="text-orange-200 text-lg mb-8 max-w-md mx-auto drop-shadow-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Looks like this page got sucked into a black hole! 
            Don't worry, we can help you navigate back to safety.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              to="/"
              className="px-6 py-2 rounded-full bg-orange-600 text-white font-medium 
                         transition-all duration-300 hover:shadow-[0_0_8px_rgba(220,38,38,0.4)]
                         hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 rounded-full border border-orange-600 text-orange-400 hover:bg-orange-600/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced floating stars and particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-orange-400 rounded-full opacity-60"
          style={{
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Additional cosmic particles with orange theme */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-orange-500 rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
});