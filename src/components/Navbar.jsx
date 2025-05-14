import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Menu", path: "#menu" },
  { title: "Gallery", path: "#galleria" },
  { title: "Contact", path: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: -5 // Ridotto da -10 a -5 per un movimento più sottile
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Ridotta la durata
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.15 // Animazione hover più rapida
    }
  }
};

const underlineVariants = {
  hidden: { width: 0 },
  hover: {
    width: "100%",
    transition: {
      duration: 0.2, // Underline più rapido
      ease: "easeOut"
    }
  }
};

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleNav = () => setNav((prev) => !prev);
  const closeNav = () => setNav(false);

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeNav();
  };

  useEffect(() => {
    setIsMounted(true);
    const checkBackground = () => {
      const navbar = document.querySelector('nav');
      if (!navbar) return;
      
      const navbarRect = navbar.getBoundingClientRect();
      const pointToCheck = navbarRect.bottom + 5;
      
      const elementBelow = document.elementFromPoint(
        window.innerWidth / 2,
        pointToCheck
      );
      
      if (!elementBelow) return;
      
      const bgColor = getComputedStyle(elementBelow).backgroundColor;
      const isWhite = bgColor === 'rgb(255, 255, 255)' || 
                     elementBelow.closest('[data-white-section="true"]');
      
      setHasWhiteBackground(!!isWhite);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground);
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  return (
    <nav className="z-50 fixed w-full top-0"> {/* Aggiunto top-0 per aderire al bordo superiore */}
      <motion.div 
        className={`absolute inset-0 transition-all duration-300 ${
          hasWhiteBackground 
            ? 'bg-white/80 backdrop-blur-sm shadow-sm' 
            : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-3 relative" // Ridotto py-6 a py-3
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="flex justify-center mb-6 cursor-pointer" // Ridotto mb-10 a mb-6
          variants={itemVariants}
          onClick={scrollToHero}
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className={`h-16 object-contain ${ // Ridotto h-20 a h-16
              hasWhiteBackground 
                ? 'filter brightness-0 opacity-90 hover:opacity-100' 
                : 'opacity-95 hover:opacity-100'
            }`}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400 }
            }}
          />
        </motion.div>

        <motion.div 
          className="hidden md:flex justify-between w-full max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {navLinks.map((link, index) => (
            <motion.div 
              key={`nav-${index}`}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
            >
              <a
                href={link.path}
                className={`text-lg px-3 relative ${ // Ridotto text-xl a text-lg e px-4 a px-3
                  hasWhiteBackground 
                    ? 'text-gray-700 hover:text-green-600' 
                    : 'text-white hover:text-green-400'
                } transition-colors duration-200 block`} // Ridotta durata hover
                style={{ minWidth: '100px', textAlign: 'center' }} // Ridotto minWidth
              >
                {link.title}
                <motion.span
                  className={`absolute bottom-0 left-0 h-[2px] ${ // Sottolineatura più sottile (h-0.5 a h-[2px])
                    hasWhiteBackground ? 'bg-green-600' : 'bg-green-400'
                  }`}
                  variants={underlineVariants}
                  initial="hidden"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={toggleNav}
          className={`md:hidden focus:outline-none fixed right-4 top-4 z-50 p-2 rounded-full ${ // Avvicinato al bordo (right-6/right-4 e top-6/top-4)
            hasWhiteBackground 
              ? 'bg-white/90 text-gray-800 hover:text-green-600 shadow-sm' 
              : 'bg-black/30 text-white hover:text-green-400'
          }`}
          aria-expanded={nav}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          {nav ? (
            <AiOutlineClose size={20} aria-hidden="true" /> 
          ) : (
            <AiOutlineMenu size={20} aria-hidden="true" />
          )}
        </motion.button>
      </motion.div>

      {nav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center pt-6" // Aggiunto pt-6
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className="h-20 mb-8 object-contain cursor-pointer" // Ridotto h-28 a h-20 e mb-12 a mb-8
            initial={{ opacity: 0, y: -10 }} // Ridotto y: -20 a y: -10
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }} // Ridotta durata
            onClick={scrollToHero}
          />
          
          <div className="space-y-6 text-center"> {/* Ridotto space-y-8 a space-y-6 */}
            {navLinks.map((link, index) => (
              <motion.div
                key={`mobile-nav-${index}`}
                initial={{ opacity: 0, x: -10 }} // Ridotto x: -20 a x: -10
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.15 + index * 0.08, // Ridotto delay
                  duration: 0.3 // Ridotta durata
                }}
              >
                <a
                  href={link.path}
                  onClick={closeNav}
                  className="text-2xl text-white hover:text-green-400 block py-3 relative group" // Ridotto text-3xl a text-2xl e py-4 a py-3
                >
                  {link.title}
                  <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[2px] bg-green-400 w-0 group-hover:w-3/4 transition-all duration-200"></span> {/* Sottolineatura più sottile e ridotta durata */}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};