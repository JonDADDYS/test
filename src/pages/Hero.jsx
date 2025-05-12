import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import { useRef } from 'react';

export const Hero = () => {
  const heroRef = useRef(null);
  
  // Hook per l'animazione dello scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Animazioni di scale e parallasse
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Varianti per l'animazione di entrata
  const socialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  // Nuova animazione di entrata per le icone
  const socialIconEntrance = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        duration: 0.6
      }
    }
  };

  // Varianti per l'hover (invariate)
  const socialIconHoverVariants = {
    initial: { 
      scale: 1, 
      color: "#ffffff",
      rotate: 0
    },
    hover: { 
      scale: 1.2,
      color: "#16a34a",
      rotate: [0, 10, -10, 5, -5, 0],
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        color: {
          duration: 0.5
        },
        rotate: {
          duration: 0.8
        }
      } 
    }
  };

  // Effetto "pulse" continuo
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Sfondo con animazione */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/img/sfondo.jpg')",
          scale,
          y,
          willChange: "transform"
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </motion.div>
      
      {/* Contenuto */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Antica Hosteria</span>
          <span className="block text-green-600">Odiago</span>
        </motion.h1>
        
        {/* Icone Social con nuova animazione di entrata */}
        <motion.div 
          className="flex justify-center gap-8 mb-8"
          variants={socialContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://instagram.com/tuoprofilo"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconEntrance}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            initial="hidden"
            animate={["visible", "pulse"]}
            className="cursor-pointer"
          >
            <motion.div
              variants={socialIconHoverVariants}
              whileHover="hover"
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
            >
              <Instagram size={32} strokeWidth={1.5} />
            </motion.div>
          </motion.a>

          <motion.a
            href="https://facebook.com/tuapagina"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconEntrance}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            initial="hidden"
            animate={["visible", "pulse"]}
            className="cursor-pointer"
          >
            <motion.div
              variants={socialIconHoverVariants}
              whileHover="hover"
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
            >
              <Facebook size={32} strokeWidth={1.5} />
            </motion.div>
          </motion.a>
        </motion.div>
        
        <motion.button
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#166534"
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