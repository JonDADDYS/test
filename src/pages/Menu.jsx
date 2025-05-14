import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

export const Menu = () => {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [direction, setDirection] = useState(1);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const menus = [
    {
      title: "Menù degustazione Maggio e Giugno 2025",
      period: "Valido da oggi fino a domenica 29/06",
      items: [
        { category: "Antipasto", description: "Antipasto speciale dell'Hosteria con salumi nostrani  conserve e formaggi" },
        { category: "Bis di Primi Piatti", description: "Casoncelli alla Bergamasca fatti a mano\nRisotto mantecato con crema di asparagi e guanciale croccante" },
        { category: "Bis di Secondi Piatti con Polenta Taragna", description: "Stufato di Asino\nRoast beef di manzo all'inglese con patate" },
        { category: "Dolce", description: "Dolce dalla Selezione del giorno" },
        { category: "Include", description: "Acqua Minerale\nCaffè Espresso" },
        { category: "Prezzo", description: "€ 35 \nVino escluso" }
      ],
      note: "La domenica a pranzo e per i gruppi numerosi consigliamo sempre il nostro menù degustazione..."
    },
    {
      title: "Menù degustazione Luglio e Agosto 2025",
      period: "Valido dal 01/07 al 02/09",
      items: [
        { category: "Antipasto", description: "Antipasto speciale dell'Hosteria con salumi nostrani  conserve e formaggi" },
        { category: "Bis di Primi Piatti", description: "Casoncelli alla Bergamasca fatti a mano\nRisotto mantecato al basilico con ricotta nostrana e mandorle tostate" },
        { category: "Bis di Secondi Piatti con Polenta Taragna", description: "Spiedino rustico di Maiale Nostrano alla griglia\nRoast beef di puledro all'inglese profumato alla menta con patate" },
        { category: "Dolce", description: "Dolce dalla Selezione del giorno" },
        { category: "Include", description: "Acqua Minerale\nCaffè Espresso" },
        { category: "Prezzo", description: "€ 35\nVino escluso" }
      ],
      note: "Per i più piccoli: menù baby con un primo semplice, cotoletta o secondo semplice €22..."
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const nextMenu = () => {
    setDirection(1);
    setCurrentMenu((prev) => (prev + 1) % menus.length);
  };

  const prevMenu = () => {
    setDirection(-1);
    setCurrentMenu((prev) => (prev - 1 + menus.length) % menus.length);
  };

  const menuVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  // Varianti più veloci solo per l'apparizione iniziale
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Ridotto da 0.8 a 0.4
        staggerChildren: 0.1, // Ridotto da 0.2 a 0.1
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Ridotto y da 20 a 10
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Ridotto da 0.6 a 0.3
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="menu" 
      data-white-section="true" 
      className="bg-stone-100 py-16 md:py-24"
      ref={ref}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 pt-14"
      >
        <motion.h2 
         className="text-4xl md:text-5xl font-bold text-gray-800  text-center mb-16"
          variants={itemVariants}
          
        >
          I Nostri Menù
           <div className="w-24 h-1 bg-green-600 mx-auto mt-3" />
        </motion.h2>

        
        
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto relative"
        >
          {/* Freccie di navigazione */}
          <motion.button 
            onClick={prevMenu}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 p-2 rounded-full bg-white shadow-md hover:bg-stone-200 transition-all"
            aria-label="Menu precedente"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="text-2xl text-stone-700" />
          </motion.button>
          
          <motion.button 
            onClick={nextMenu}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 p-2 rounded-full bg-white shadow-md hover:bg-stone-200 transition-all"
            aria-label="Menu successivo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="text-2xl text-stone-700" />
          </motion.button>

          {/* Contenitore del menu con altezza fissa più grande */}
          <div className="relative h-[650px] md:h-[700px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentMenu}
                custom={direction}
                variants={menuVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col"
              >
                <motion.div
                  className="flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }} // Ridotto da 0.2 a 0.1
                >
                  <div className="mb-4">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-serif text-green-600 mb-1"
                    >
                      {menus[currentMenu].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-stone-500 text-sm md:text-base"
                    >
                      {menus[currentMenu].period}
                    </motion.p>
                  </div>

                  <div className="flex-grow overflow-y-auto pr-2">
                    <div className="space-y-4">
                      {menus[currentMenu].items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }} // Ridotto x da -20 a -10
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.2 + index * 0.05, // Ridotto delay e incremento
                            duration: 0.2 // Ridotto da 0.3 a 0.2
                          }}
                          className="border-b border-stone-100 pb-3"
                        >
                          <h4 className="font-serif text-lg md:text-xl text-green-600 mb-1">{item.category}</h4>
                          <p className="text-stone-600 text-sm md:text-base whitespace-pre-line">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }} // Ridotto da 0.9 a 0.4
                    className="bg-amber-50 p-3 md:p-4 rounded border-l-4 border-amber-300 mt-4"
                  >
                    <p className="text-stone-600 italic text-sm md:text-base whitespace-pre-line">{menus[currentMenu].note}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicatori */}
          <motion.div
            className="flex justify-center mt-6 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }} // Ridotto da 1 a 0.5
          >
            {menus.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentMenu ? 1 : -1);
                  setCurrentMenu(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${index === currentMenu ? 'bg-green-600 scale-125' : 'bg-stone-300'}`}
                aria-label={`Vai al menu ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};