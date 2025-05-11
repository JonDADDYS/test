import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Menu", path: "#menu" },
  { title: "Gallery", path: "#gallery" },
  { title: "Contact", path: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);

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
    <nav className="z-50 fixed w-full">
      <motion.div 
        className={`absolute inset-0 transition-all duration-500 ${
          hasWhiteBackground 
            ? 'bg-white/80 backdrop-blur-sm shadow-sm' 
            : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-6 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo con hover ottimizzato */}
        <motion.div 
          className="flex justify-center mb-10 cursor-pointer"
          variants={itemVariants}
          onClick={scrollToHero}
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className={`h-20 object-contain ${
              hasWhiteBackground 
                ? 'filter brightness-0 opacity-90 hover:opacity-100' 
                : 'opacity-95 hover:opacity-100'
            }`}
            whileHover={{
              scale: 1.05,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 0.7,
                velocity: 0.5
              }
            }}
            transition={{
              duration: 0.15,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          />
        </motion.div>

        <motion.div 
          className="hidden md:flex justify-between w-full max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={`nav-${index}`}
              href={link.path}
              className={`text-xl transition-all duration-500 px-4 ${
                hasWhiteBackground 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white hover:text-gray-200'
              }`}
              style={{ minWidth: '120px', textAlign: 'center' }}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              {link.title}
            </motion.a>
          ))}
        </motion.div>

        <motion.button
          onClick={toggleNav}
          className={`md:hidden focus:outline-none fixed right-6 top-6 z-50 p-2 rounded-full transition-all duration-500 ${
            hasWhiteBackground 
              ? 'bg-white/90 text-gray-800 shadow-sm' 
              : 'bg-black/30 text-white'
          }`}
          aria-expanded={nav}
          aria-controls="mobile-menu"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: hasWhiteBackground ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.5)'
          }}
        >
          {nav ? (
            <AiOutlineClose size={24} aria-hidden="true" />
          ) : (
            <AiOutlineMenu size={24} aria-hidden="true" />
          )}
        </motion.button>
      </motion.div>

      {nav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center"
        >
          {/* Logo mobile con hover ottimizzato */}
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className="h-28 mb-12 object-contain cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 0.7
              }
            }}
            transition={{ 
              delay: 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              duration: 0.15
            }}
            onClick={scrollToHero}
          />
          
          <motion.ul 
            className="space-y-10 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {navLinks.map((link, index) => (
              <motion.li key={`mobile-nav-${index}`} variants={itemVariants}>
                <motion.a
                  href={link.path}
                  onClick={closeNav}
                  className="text-3xl text-white hover:text-green-400 block py-6"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.title}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
};