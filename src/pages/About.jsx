import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const About = () => {
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  // Animazioni per i blocchi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageLoadVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    if (inView1) controls.start("visible");
  }, [controls, inView1]);

  return (
    <section id="about" data-white-section="true" className="bg-white py-16 md:py-24">
      {/* Citazione animata */}
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <motion.div 
          variants={textVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-serif text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={inView1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span 
              className="block italic text-green-600 text-5xl mb-2"
              initial={{ scale: 0 }}
              animate={inView1 ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >"</motion.span>
            Dal 1905 a vostro servizio
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Tradizione e passione si incontrano nella nostra cucina, dove ogni piatto racconta una storia
          </motion.p>
        </motion.div>

        {/* Sezione storia + piatti */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-8">
          {/* Blocco storia */}
          <motion.div 
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <motion.div 
              variants={imageLoadVariants}
              whileHover="hover"
              initial="rest"
              className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <motion.img 
                src="/img/storia.jpg" 
                alt="Storia dell'osteria"
                className="w-full h-full object-cover"
                variants={imageHoverVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
              />
            </motion.div>
            <motion.div 
              variants={textVariants}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl font-serif text-gray-800 mb-3">La nostra storia</h3>
              <motion.p 
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView2 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Fondata nel 1905, la nostra osteria ha servito generazioni di avventori con piatti che rispecchiano la tradizione locale.
              </motion.p>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={inView2 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Da piccolo locale di paese a rinomata meta gastronomica, mantenendo intatta l'autenticità delle ricette originali.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Blocco cucina */}
          <motion.div 
            ref={ref3}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <motion.div 
              variants={imageLoadVariants}
              whileHover="hover"
              initial="rest"
              className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden rounded-lg shadow-md order-1 md:order-2 cursor-pointer"
            >
              <motion.img 
                src="/img/menu.jpg" 
                alt="Specialità della casa"
                className="w-full h-full object-cover"
                variants={imageHoverVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
              />
            </motion.div>
            <motion.div 
              variants={textVariants}
              className="text-center md:text-left order-2 md:order-1"
            >
              <h3 className="text-2xl font-serif text-gray-800 mb-3">La nostra cucina</h3>
              <motion.p 
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView3 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Cucina d'osteria rivisitata con materie prime selezionate e tecniche moderne.
              </motion.p>
              <motion.ul 
                className="text-gray-600 space-y-2"
                initial={{ opacity: 0 }}
                animate={inView3 ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <motion.li 
                  initial={{ x: -10 }}
                  animate={inView3 ? { x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >• Pasta fatta a mano giornalmente</motion.li>
                <motion.li 
                  initial={{ x: -10 }}
                  animate={inView3 ? { x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >• Carni provenienti da allevamenti locali</motion.li>
                <motion.li 
                  initial={{ x: -10 }}
                  animate={inView3 ? { x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >• Pesce fresco del mare Adriatico</motion.li>
                <motion.li 
                  initial={{ x: -10 }}
                  animate={inView3 ? { x: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >• Vini selezionati dalla cantina storica</motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Citazione finale */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-500 italic">
            "Non si tratta solo di cibo, ma di esperienze che durano nel tempo"
          </p>
          <p className="text-gray-400 mt-2">- Lo chef</p>
        </motion.div>
      </motion.div>
    </section>
  );
};