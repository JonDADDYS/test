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
        { category: "ANTIPASTO", description: "Antipasto speciale dell'Hosteria con salumi nostrani conserve e formaggi" },
        { category: "PRIMI PIATTI", description: "Casoncelli alla Bergamasca fatti a mano\nRisotto mantecato con crema di asparagi e guanciale croccante" },
        { category: "SECONDI PIATTI", description: "Stufato di Asino\nRoast beef di manzo all'inglese con patate" },
        { category: "DOLCE", description: "Dolce dalla Selezione del giorno" },
        { category: "INCLUDE", description: "Acqua Minerale\nCaffè Espresso" },
        { category: "PREZZO", description: "€ 35 \nVino escluso" }
      ],
      note: "La domenica a pranzo e per i gruppi numerosi consigliamo sempre il nostro menù degustazione..."
    },
    {
      title: "Menù degustazione Luglio e Agosto 2025",
      period: "Valido dal 01/07 al 02/09",
      items: [
        { category: "ANTIPASTO", description: "Antipasto speciale dell'Hosteria con salumi nostrani conserve e formaggi" },
        { category: "PRIMI PIATTI", description: "Casoncelli alla Bergamasca fatti a mano\nRisotto mantecato al basilico con ricotta nostrana e mandorle tostate" },
        { category: "SECONDI PIATTI", description: "Spiedino rustico di Maiale Nostrano alla griglia\nRoast beef di puledro all'inglese profumato alla menta con patate" },
        { category: "DOLCE", description: "Dolce dalla Selezione del giorno" },
        { category: "INCLUDE", description: "Acqua Minerale\nCaffè Espresso" },
        { category: "PREZZO", description: "€ 35\nVino escluso" }
      ],
      note: "Per i più piccoli: menù baby con un primo semplice, cotoletta o secondo semplice €22..."
    },
    {
      title: "Menù Speciale Estate 2025",
      period: "Valido dal 15/07 al 31/08",
      items: [
        { category: "ANTIPASTO", description: "Selezione di specialità estive con crudo di pesce e verdure di stagione" },
        { category: "PRIMI PIATTI", description: "Tagliolini freschi al tartufo estivo\nRisotto alla pescatora con zafferano" },
        { category: "SECONDI PIATTI", description: "Grigliata mista di carne e pesce\nFrittura di calamari e gamberi con tartare" },
        { category: "DOLCE", description: "Macedonia di frutta tropicale con sorbetto al limone" },
        { category: "INCLUDE", description: "Acqua Minerale\nCaffè Espresso\nCalice di prosecco" },
        { category: "PREZZO", description: "€ 45\nVino escluso" }
      ],
      note: "Menu disponibile solo su prenotazione con almeno 24 ore di anticipo...",
      isNew: true
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
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      position: 'absolute'
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      position: 'absolute',
      transition: {
        duration: 0.3
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const borderAnimation = {
    initial: { '--gradient-pos': '0%' },
    animate: { 
      '--gradient-pos': '100%',
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
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
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
            I Nostri Menù
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto" />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto relative"
        >
          {/* Freccie di navigazione */}
          <motion.button 
            onClick={prevMenu}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 p-2 rounded-full bg-white shadow-md hover:bg-stone-200 transition-all border border-gray-200"
            aria-label="Menu precedente"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="text-2xl text-stone-700" />
          </motion.button>
          
          <motion.button 
            onClick={nextMenu}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 p-2 rounded-full bg-white shadow-md hover:bg-stone-200 transition-all border border-gray-200"
            aria-label="Menu successivo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="text-2xl text-stone-700" />
          </motion.button>

          {/* Contenitore del menu */}
          <div className="relative min-h-[500px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentMenu}
                custom={direction}
                variants={menuVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white p-6 rounded-lg shadow-lg relative"
              >
                {/* Animazione bordo solo per il menu "new" */}
                {menus[currentMenu].isNew && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none z-0"
                      variants={borderAnimation}
                      initial="initial"
                      animate="animate"
                      style={{
                        padding: '2px',
                        background: `linear-gradient(90deg, transparent, transparent, transparent, transparent)`,
                        backgroundImage: 'linear-gradient(90deg, transparent, #10b981, #10b981, transparent)',
                        backgroundSize: '300% 100%',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                      }}
                    />
                    <div className="absolute -top-3 -right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                      NEW
                    </div>
                  </>
                )}
                
                <div className="relative z-10">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {menus[currentMenu].title}
                    </h3>
                    <p className="text-stone-500 text-sm">
                      {menus[currentMenu].period}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {menus[currentMenu].items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.2 + index * 0.05,
                          duration: 0.2
                        }}
                        className="text-center"
                      >
                        <h4 className="font-serif text-lg text-green-600 mb-1 tracking-wider">
                          - {item.category} -
                        </h4>
                        <p className="text-stone-600 whitespace-pre-line">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-amber-50 p-4 rounded border-l-4 border-amber-300 mt-8 text-center italic text-stone-600"
                  >
                    {menus[currentMenu].note}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicatori */}
          <motion.div
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {menus.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentMenu ? 1 : -1);
                  setCurrentMenu(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${index === currentMenu ? 'bg-green-600' : 'bg-gray-300'}`}
                aria-label={`Vai al menu ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};