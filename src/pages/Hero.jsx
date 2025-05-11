import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';

export const Hero = () => {
  const socialIconVariants = {
    initial: { 
      scale: 1, 
      color: "#ffffff" // Bianco
    },
    hover: { 
      scale: [1, 1.2, 1.15], // Leggera overshoot per un effetto più naturale
      color: "#16a34a", // Verde
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Curva di easing personalizzata
        color: {
          duration: 0.5,
          ease: "easeInOut"
        }
      } 
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Sfondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/img/sfondo.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      {/* Contenuto */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8.75xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
       {/*  <p className="font-mono text-xl text-green-600">Dal 1905</p> */}
          <span className="block">Antica Osteria</span>
          <span className="block text-green-600">Odiago</span>
        </motion.h1>
        
        <motion.p
          className="text-xl text-amber-100 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          
        </motion.p>

        {/* Icone Social - Versione Smooth */}
        <motion.div 
          className="flex justify-center gap-8 mb-8" // Aumentato gap a 8
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://instagram.com/tuoprofilo"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            initial="initial"
            whileHover="hover"
            className="cursor-pointer"
          >
            <Instagram size={30} /> {/* Leggermente più grande */}
          </motion.a>

          <motion.a
            href="https://facebook.com/tuapagina"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            initial="initial"
            whileHover="hover"
            className="cursor-pointer"
          >
            <Facebook size={30} /> {/* Leggermente più grande */}
          </motion.a>
        </motion.div>
        
        <motion.button
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#166534" // Verde più scuro
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Prenota un tavolo
        </motion.button>
      </div>
    </section>
  );
};