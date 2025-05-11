import React, { useState } from "react";
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
      ease: "easeOut" // Sostituito con easing standard
    }
  }
};

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => setNav((prev) => !prev);
  const closeNav = () => setNav(false);

  return (
    <div className="z-50 fixed w-full bg-transparent">
      {/* Navbar principale */}
      <motion.div 
        className="container mx-auto px-4 py-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-10"
          variants={itemVariants}
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className="h-20 object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </motion.div>

        {/* Desktop Links */}
        <motion.div 
          className="hidden md:flex justify-between w-full max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={`nav-${index}`}
              href={link.path}
              className="text-white text-xl hover:text-green-400 transition-colors duration-300 px-4"
              style={{ minWidth: '120px', textAlign: 'center' }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              {link.title}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Button */}
        <motion.button
          onClick={toggleNav}
          className="md:hidden text-white focus:outline-none fixed right-6 top-6 z-50 p-2 bg-black/30 rounded-full"
          aria-expanded={nav}
          aria-controls="mobile-menu"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          {nav ? (
            <AiOutlineClose size={24} aria-hidden="true" />
          ) : (
            <AiOutlineMenu size={24} aria-hidden="true" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      {nav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center"
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className="h-28 mb-12 object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ease: "easeOut" }}
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
                  className="text-3xl text-white hover:text-amber-400 block py-6"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.title}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
};