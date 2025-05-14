import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const Galleria = () => {
  const controls = useAnimation();
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

  // Immagini dei piatti
  const plates = [
    { id: 1, img: '/img/pt1.jpg', title: 'Risotto al tartufo', description: 'Riso carnaroli con tartufo nero fresco' },
    { id: 2, img: '/img/pt2.jpg', title: 'Tagliatelle al ragù', description: 'Pasta fresca con ragù di carne stagionato' },
    { id: 3, img: '/img/pt3.jpg', title: 'Branzino al cartoccio', description: 'Pesce fresco con erbe aromatiche' },
    { id: 4, img: '/img/pt4.jpg', title: 'Antipasto della casa', description: 'Selezione di salumi e formaggi locali' },
    { id: 5, img: '/img/pt5.jpg', title: 'Tiramisù classico', description: 'Dessert tradizionale con caffè di montagna' },
    { id: 6, img: '/img/pt6.jpg', title: 'Filetto al pepe verde', description: 'Carne di Fassona piemontese' },
    { id: 7, img: '/img/pt7.jpg', title: 'Zuppa di legumi', description: 'Legumi del territorio con crostini' },
    { id: 8, img: '/img/pt8.jpg', title: 'Panna cotta', description: 'Con salsa di frutti di bosco' }
  ];

  // Animazione al scroll
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
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const titleItem = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="galleria"  data-white-section="true" ref={galleryRef} className="relative py-20 bg-white">
      {/* Pattern decorativo sottile */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(#2a5c3a 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      
      <div className="container mx-auto px-4 relative">
        {/* Titolo con animazione migliorata */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleItem}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 mt-20"
          >
            I Nostri Piatti
          </motion.h2>
          <motion.div 
            variants={titleItem}
            className="w-24 h-1 bg-green-600 mx-auto mb-6"
          />
          <motion.p 
            variants={titleItem}
            className="text-green-700/90 max-w-2xl mx-auto text-lg"
          >
            Tradizione e innovazione nei sapori della nostra cucina
          </motion.p>
        </motion.div>

        {/* Galleria con animazioni migliorate */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-0.5"
        >
          {plates.map((plate) => (
            <motion.div
              key={plate.id}
              variants={item}
              className="relative group overflow-hidden aspect-square"
              whileHover="hover"
            >
              {/* Immagine con effetto zoom e luminosità */}
              <motion.img
                src={plate.img}
                alt={plate.title}
                className="w-full h-full object-cover"
                variants={{
                  hover: { 
                    scale: 1.1,
                    filter: 'brightness(1.05)'
                  }
                }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
              
              {/* Overlay con animazione fluida */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0"
                variants={{
                  hover: { 
                    opacity: 1,
                    transition: { duration: 0.4 }
                  }
                }}
              />
              
              {/* Testo che scende */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4"
                initial={{ y: 50, opacity: 0 }}
                variants={{
                  hover: { 
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.1,
                      duration: 0.5
                    }
                  }
                }}
              >
                <h3 className="text-white font-medium text-lg drop-shadow-md">{plate.title}</h3>
                <motion.p 
                  className="text-white/90 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: { delay: 0.2 }
                    }
                  }}
                >
                  {plate.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testo finale con animazione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.8 }
          } : {}}
          className="text-center mt-16"
        >
          <p className="text-green-700 italic">
            "Ogni ingrediente è selezionato con cura per garantire autenticità e qualità"
          </p>
        </motion.div>
      </div>
    </section>
  );
};