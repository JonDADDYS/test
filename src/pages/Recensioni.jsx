import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaTripadvisor } from 'react-icons/fa';

export const Recensioni = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [currentSlide, setCurrentSlide] = useState(0);
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
      name: "Laura Bianchi",
      rating: 4,
      title: "Atmosfera autentica",
      text: "Ci siamo sentiti come a casa in questo locale accogliente.",
      date: "22/07/2023"
    },
    {
      id: 3,
      name: "Giovanni Verdi",
      rating: 5,
      title: "Pesce freschissimo",
      text: "Il branzino al cartoccio era cotto al punto giusto.",
      date: "05/09/2023"
    },
    {
      id: 4,
      name: "Anna Neri",
      rating: 5,
      title: "Dolci da sogno",
      text: "La panna cotta con frutti di bosco è semplicemente divina!",
      date: "12/10/2023"
    },
    {
      id: 5,
      name: "Paolo Gialli",
      rating: 4,
      title: "Creatività e tradizione",
      text: "Abbiamo apprezzato l'approccio innovativo ai piatti classici.",
      date: "28/10/2023"
    },
    {
      id: 6,
      name: "Francesca Blu",
      rating: 5,
      title: "Perfetto per occasioni speciali",
      text: "Lo staff ha fatto di tutto per renderlo indimenticabile.",
      date: "03/11/2023"
    }
  ];

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
        delayChildren: 0.2
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

  // Transizione fluida tra le slide
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 bg-green-600"
      id="recensioni"
    >
      <div className="container mx-auto px-4 relative">
        {/* Titolo */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-10"
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

        {/* Slider container - Mobile (1 slide) e Desktop (3 slides) */}
        <div className="relative h-[400px] md:h-[280px]">
          {/* Freccia sinistra */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <FiChevronLeft size={28} />
          </button>

          {/* Recensioni mobile (1 alla volta) */}
          <div className="md:hidden h-full">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex justify-center"
            >
              <div className="text-white p-5 flex flex-col items-center text-center w-full max-w-md">
                <h3 className="text-2xl font-serif font-medium mb-3">{reviews[currentSlide].name}</h3>
                <div className="flex mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < reviews[currentSlide].rating ? 'text-yellow-300' : 'text-white/30'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="text-xl font-serif font-medium mb-3 text-white/90">{reviews[currentSlide].title}</h4>
                <blockquote className="text-white/80 mb-4 italic text-lg">"{reviews[currentSlide].text}"</blockquote>
                <div className="text-white/60 text-base">{reviews[currentSlide].date}</div>
              </div>
            </motion.div>
          </div>

          {/* Recensioni desktop (3 alla volta) */}
          <div className="hidden md:block h-full">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 grid grid-cols-3 gap-6 px-2"
            >
              {[
                reviews[currentSlide],
                reviews[(currentSlide + 1) % reviews.length],
                reviews[(currentSlide + 2) % reviews.length]
              ].map((review, index) => (
                <div key={`${review.id}-${index}`} className="text-white p-5 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-serif font-medium mb-3">{review.name}</h3>
                  <div className="flex mb-3 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < review.rating ? 'text-yellow-300' : 'text-white/30'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h4 className="text-xl font-serif font-medium mb-3 text-white/90">{review.title}</h4>
                  <blockquote className="text-white/80 mb-4 italic max-w-md text-lg">"{review.text}"</blockquote>
                  <div className="text-white/60 text-base">{review.date}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Freccia destra */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <FiChevronRight size={28} />
          </button>
        </div>

        {/* Indicatori slider */}
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Bottone Tripadvisor */}
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
            href="https://www.tripadvisor.it/Restaurant_Review-g2712987-d2697255-Reviews-Antica_Hosteria_di_Odiago-Odiago_Province_of_Bergamo_Lombardy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full text-base group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-2 border-transparent hover:border-green-100"
          >
            <span className="mr-3 font-medium">Vedi tutte le recensioni</span>
            <FaTripadvisor className="text-[#00AA6C] text-2xl transition-all duration-300 group-hover:text-green-600 group-hover:scale-110" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};