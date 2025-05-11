import { motion } from 'framer-motion';
import { MapPin, Utensils, History } from 'lucide-react';

export const About = () => {
  // Definizione delle animazioni
  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const contentAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="about" className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-serif text-center mb-16 text-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={cardAnimation}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        >
          La Nostra Storia
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Storia */}
          <motion.div
            className="bg-white rounded-2xl overflow-hidden border border-gray-200"
            initial="hidden"
            whileInView="visible"
            variants={cardAnimation}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          >
            <motion.div 
              className="h-48 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/img/storia.jpg" 
                alt="Storica osteria"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="flex items-center mb-4"
              >
                <History className="text-amber-600 mr-2" size={24} />
                <h3 className="text-xl font-serif text-gray-800">La Nostra Storia</h3>
              </motion.div>
              <motion.p
                className="text-gray-600 mb-4"
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
              >
                Fondata nel 1950, la nostra osteria porta avanti la tradizione 
                culinaria di famiglia.
              </motion.p>
              <motion.button
                className="text-amber-600 hover:text-amber-800 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Scopri di più →
              </motion.button>
            </div>
          </motion.div>

          {/* Card 2 - Menu */}
          <motion.div
            className="bg-white rounded-2xl overflow-hidden border border-gray-200"
            initial="hidden"
            whileInView="visible"
            variants={cardAnimation}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="h-48 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/img/menu.jpg" 
                alt="Piatto tipico"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
                className="flex items-center mb-4"
              >
                <Utensils className="text-amber-600 mr-2" size={24} />
                <h3 className="text-xl font-serif text-gray-800">Il Nostro Menu</h3>
              </motion.div>
              <motion.p
                className="text-gray-600 mb-4"
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
              >
                Piatti preparati con ingredienti locali seguendo antiche ricette.
              </motion.p>
              <motion.button
                className="text-amber-600 hover:text-amber-800 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Vedi il menu →
              </motion.button>
            </div>
          </motion.div>

          {/* Card 3 - Dove Trovarci */}
          <motion.div
            className="bg-white rounded-2xl overflow-hidden border border-gray-200"
            initial="hidden"
            whileInView="visible"
            variants={cardAnimation}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="h-48 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <iframe 
                title="Mappa dell'osteria"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.654246110987!2d12.492351315441486!3d41.890210179221295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1623396146140!5m2!1sit!2sit" 
                className="w-full h-full border-0" 
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
            <div className="p-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
                className="flex items-center mb-4"
              >
                <MapPin className="text-amber-600 mr-2" size={24} />
                <h3 className="text-xl font-serif text-gray-800">Dove Trovarci</h3>
              </motion.div>
              <motion.p
                className="text-gray-600 mb-4"
                initial="hidden"
                whileInView="visible"
                variants={contentAnimation}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
              >
                Via della Tradizione, 123<br />
                00100 Roma (RM)
              </motion.p>
              <motion.button
                className="text-amber-600 hover:text-amber-800 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Indicazioni →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};