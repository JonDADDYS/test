import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Recensioni = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [currentSet, setCurrentSet] = useState(0);
  const [direction, setDirection] = useState(0);

  // Dati recensioni
  const reviews = [
    {
      id: 1,
      name: "Marco Rossi",
      rating: 5,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
     {
      id: 2,
      name: "Marco Rossi",
      rating: 5,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
     {
      id: 3,
      name: "Antonio Bianchi",
      rating: 1,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
     {
      id: 4,
      name: "Marco Rossi",
      rating: 5,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
     {
      id: 5,
      name: "Marco Rossi",
      rating: 4.5,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
     {
      id: 6,
      name: "Marco Rossi",
      rating:2,
      title: "Esperienza indimenticabile",
      text: "La cena all'Osteria Odiago è stata il punto culminante del nostro viaggio.",
      date: "15/06/2023"
    },
    // ... altre recensioni ...
  ];

  // Calcola i gruppi di 3 recensioni
  const reviewSets = [];
  for (let i = 0; i < reviews.length; i += 3) {
    reviewSets.push(reviews.slice(i, i + 3));
  }

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
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Transizione fluida tra le slide
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4 }
    })
  };

  const reviewItem = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const nextSet = () => {
    setDirection(1);
    setCurrentSet((prev) => (prev === reviewSets.length - 1 ? 0 : prev + 1));
  };

  const prevSet = () => {
    setDirection(-1);
    setCurrentSet((prev) => (prev === 0 ? reviewSets.length - 1 : prev - 1));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 bg-green-600" // Ridotta altezza sezione
      id="recensioni"
    >
      <div className="container mx-auto px-4 relative">
        {/* Titolo */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-10" // Ridotto margine inferiore
        >
          <motion.h2 
            variants={item} 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Dicono di Noi
          </motion.h2>
          <motion.div 
            variants={item} 
            className="w-24 h-1 bg-white mx-auto mt-3"
          />
          <motion.p 
            variants={item} 
            className="text-white/90 max-w-2xl mx-auto mt-5 text-lg"
          >
            Le esperienze dei nostri clienti
          </motion.p>
        </motion.div>

        {/* Slider container */}
        <div className="relative h-[380px] md:h-[280px]"> 
          {/* Freccia sinistra */}
          <button 
            onClick={prevSet}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <FiChevronLeft size={28} />
          </button>

          {/* Recensioni con animazione */}
          <motion.div
            key={currentSet}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
          >
            {reviewSets[currentSet]?.map((review) => (
              <motion.div
                key={review.id}
                variants={reviewItem}
                initial="hidden"
                animate="visible"
                className="text-white p-5 flex flex-col items-center text-center"
              >
                {/* Nome con font serif e dimensione aumentata */}
                <h3 className="text-2xl font-serif font-medium mb-3">{review.name}</h3>
                
                {/* Stelle */}
                <div className="flex mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < review.rating ? 'text-yellow-300' : 'text-white/30'}`} // Stelle più grandi
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Titolo recensione con font serif */}
                <h4 className="text-xl font-serif font-medium mb-3 text-white/90">{review.title}</h4>
                
                {/* Testo recensione con dimensione aumentata */}
                <blockquote className="text-white/80 mb-4 italic max-w-md text-lg">"{review.text}"</blockquote>
                
                {/* Data */}
                <div className="text-white/60 text-base">{review.date}</div> // Testo più grande
              </motion.div>
            ))}
          </motion.div>

          {/* Freccia destra */}
          <button 
            onClick={nextSet}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <FiChevronRight size={28} />
          </button>
        </div>

        {/* Indicatori slider */}
        <div className="flex justify-center mt-6 space-x-2">
          {reviewSets.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSet ? 1 : -1);
                setCurrentSet(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${currentSet === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Bottone Tripadvisor ingrandito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.8 }
          }}
          className="text-center mt-8"
        >
          <a
            href="https://www.tripadvisor.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full text-base hover:bg-gray-50 transition-colors" // Bottone più grande
          >
            <span className="mr-3 font-medium">Vedi tutte le recensioni</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 20.625C7.038 20.625 3.125 16.712 3.125 11.75C3.125 6.788 7.038 2.875 12 2.875C16.962 2.875 20.875 6.788 20.875 11.75C20.875 16.712 16.962 20.625 12 20.625ZM12.625 6.5H11.375V13.5L16.8 16.8L17.5 15.737L12.625 12.875V6.5Z" fill="#00AA6C"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};