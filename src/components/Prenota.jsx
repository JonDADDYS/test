import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export const Prenota = () => {
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const buttonRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    // Funzione per verificare la posizione rispetto alle sezioni bianche
    const checkPosition = () => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current;
      const buttonRect = button.getBoundingClientRect();
      const buttonCenter = buttonRect.top + buttonRect.height / 2;
      
      // Reset dello stato prima di verificare
      let foundWhiteSection = false;
      
      // Verifica tutte le sezioni con data-white-section="true"
      document.querySelectorAll('section[data-white-section="true"]').forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        if (buttonCenter >= sectionRect.top && buttonCenter <= sectionRect.bottom) {
          foundWhiteSection = true;
        }
      });
      
      // Aggiorna lo stato solo se è cambiato
      setIsWhiteSection(prev => prev !== foundWhiteSection ? foundWhiteSection : prev);
    };

    // Imposta uno stato iniziale corretto
    const setInitialState = () => {
      // Forza il bianco all'inizio
      setIsWhiteSection(false);
      // Poi verifica la posizione dopo un breve delay
      setTimeout(checkPosition, 100);
    };

    setInitialState();
    window.addEventListener('scroll', checkPosition);
    
    // Animazione di entrata
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });

    return () => window.removeEventListener('scroll', checkPosition);
  }, [controls]);

  return (
    <motion.div
      ref={buttonRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={`fixed md:hidden bottom-6 right-6 z-50 ${
        isWhiteSection ? 'bg-green-600' : 'bg-white'
      } rounded-2xl shadow-lg transition-colors duration-300`}
    >
      <a
        href="tel:+035-782767"
        className={`flex items-center justify-center w-32 h-12 ${
          isWhiteSection ? 'text-white hover:bg-green-700' : 'text-green-600 hover:bg-gray-100'
        } font-medium text-lg transition-colors duration-300`}
        aria-label="Prenota ora"
      >
        Prenota ora
      </a>
    </motion.div>
  );
};