import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiInstagram,
  FiFacebook,
  FiClock
} from 'react-icons/fi';

export const Footer = () => {
  const controls = useAnimation();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });

  // Animazioni al scroll
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Varianti animazione
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gray-900 text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Colonna Logo */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <img 
              src="/img/logo2.png" 
              alt="Osteria Odiago Logo" 
              className="h-24 mb-4 object-contain"
            />
            <p className="text-gray-400 text-center md:text-left">
              Tradizione e innovazione nella cucina italiana dal 1985
            </p>
          </motion.div>

          {/* Colonna Contatti */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-serif font-bold mb-6 text-white">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FiMapPin className="text-green-500 mr-3 text-lg" />
                <span>Via del Ristorante, 123 - Roma</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-green-500 mr-3 text-lg" />
                <span>+39 06 1234567</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-green-500 mr-3 text-lg" />
                <span>info@osteriaodiago.com</span>
              </li>
              <li className="flex items-center">
                <FiClock className="text-green-500 mr-3 text-lg" />
                <span>Aperto 7 giorni su 7</span>
              </li>
            </ul>
          </motion.div>

          {/* Colonna Orari */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-serif font-bold mb-6 text-white">Orari</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span className="font-medium">Lun-Ven:</span>
                <span>12:00 - 15:00 | 19:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sabato:</span>
                <span>12:00 - 15:30 | 19:00 - 23:30</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Domenica:</span>
                <span>12:00 - 15:30 | 19:00 - 22:30</span>
              </li>
            </ul>
          </motion.div>

          {/* Colonna Social */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-serif font-bold mb-6 text-white">Seguici</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-600 transition-colors p-3 rounded-full"
                aria-label="Instagram"
              >
                <FiInstagram className="text-white text-xl" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-600 transition-colors p-3 rounded-full"
                aria-label="Facebook"
              >
                <FiFacebook className="text-white text-xl" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-600 transition-colors p-3 rounded-full"
                aria-label="Tripadvisor"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm0 20.625c-4.962 0-8.875-3.913-8.875-8.875S7.038 3.125 12 3.125s8.875 3.913 8.875 8.875-3.913 8.875-8.875 8.875zM12.625 6.5h-1.25v7l5.175 3.3.7-1.063-4.625-3.237V6.5z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              Seguici per scoprire le nostre novità e promozioni
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="border-t border-gray-800 my-8"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.6 } 
          }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Osteria Odiago. Tutti i diritti riservati.</p>
          <p className="mt-2">P.IVA 12345678901</p>
           <div className="mt-4 text-gray-600 text-xs">
            Powered by Jona Troiano
          </div>
        </motion.div>
      </div>
    </footer>
  );
};