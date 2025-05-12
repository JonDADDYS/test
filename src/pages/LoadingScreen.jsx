import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500); // Durata totale del loading (3 secondi)

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Logo principale */}
        <motion.img
          src="/img/logo2.png"
          alt="Osteria Odiago Logo"
          className="h-32 object-contain opacity-90"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: 1
          }}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1]
          }}
        />

        {/* Elemento decorativo */}
        <motion.div
          className="absolute -bottom-8 left-0 right-0 mx-auto h-1 bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            delay: 0.5,
            duration: 2,
            ease: "easeInOut"
          }}
        />

        {/* Testo di caricamento */}
        <motion.p
          className="mt-10 text-center font-serif text-white opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          
        </motion.p>
      </div>
    </motion.div>
  );
};