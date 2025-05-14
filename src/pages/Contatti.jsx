import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi';

export const Contatti = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section  
      ref={sectionRef}
      className="relative py-16 bg-white"
      id="contatti" data-white-section="true"
    >
      <div className="container mx-auto px-4">
        {/* Titolo */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 mt-24"
          >
            Contatti
          </motion.h2>
          <motion.div
            variants={item}
            className="w-24 h-1 bg-green-600 mx-auto mb-6"
          />
          <motion.p 
            variants={item}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Vieni a trovarci o contattaci per prenotazioni
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mappa Google */}
          <motion.div
            variants={item}
            className="rounded-xl overflow-hidden shadow-xl h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.654246110987!2d12.492351315769785!3d41.89021017922197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1623259877690!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mappa del ristorante"
            ></iframe>
          </motion.div>

          {/* Informazioni contatto */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="flex flex-col justify-center"
          >
            {/* Indirizzo */}
            <motion.div 
              variants={item}
              className="flex items-start mb-8"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiMapPin className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Indirizzo</h3>
                <p className="text-gray-600">Via del Ristorante, 123</p>
                <p className="text-gray-600">00100 Roma (RM)</p>
              </div>
            </motion.div>

            {/* Telefono */}
            <motion.div 
              variants={item}
              className="flex items-start mb-8"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiPhone className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Telefono</h3>
                <p className="text-gray-600">+39 06 1234567</p>
                <p className="text-gray-600 text-sm mt-1">Per prenotazioni e informazioni</p>
              </div>
            </motion.div>

            {/* Orari */}
            <motion.div 
              variants={item}
              className="flex items-start mb-8"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiClock className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Orari di Apertura</h3>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-600 font-medium">Lun-Ven:</p>
                  <p className="text-gray-600">12:00 - 15:00 | 19:00 - 23:00</p>
                  <p className="text-gray-600 font-medium">Sabato:</p>
                  <p className="text-gray-600">12:00 - 15:30 | 19:00 - 23:30</p>
                  <p className="text-gray-600 font-medium">Domenica:</p>
                  <p className="text-gray-600">12:00 - 15:30 | 19:00 - 22:30</p>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={item}
              className="flex items-start"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiMail className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">info@ristoranteodiago.com</p>
                <p className="text-gray-600 text-sm mt-1">Rispondiamo entro 24 ore</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};