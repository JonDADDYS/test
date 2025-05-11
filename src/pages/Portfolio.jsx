import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import proj1 from "../assets/images/proj9.png";
import proj2 from "../assets/images/proj11.png";
import proj3 from "../assets/images/proj12.png";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

const projects = [
  {
    title: "Ecommerce Digital Products",
    desc: "Full-featured digital marketplace with secure payments and admin dashboard.",
    devstack: "MongoDB, Express, React, Node.js",
    link: "#",
    git: "#",
    src: proj1,
    type: "fullstack",
  },
  {
    title: "Interactive E-Learning Platform",
    desc: "Engaging learning platform with interactive courses and progress tracking.",
    devstack: "NextJs, Tailwind, Framer Motion",
    link: "#",
    git: "#",
    src: proj2,
    type: "frontend",
  },
  {
    title: "Portfolio Website",
    desc: "Modern portfolio showcasing creative work with smooth animations.",
    devstack: "React, Tailwind, Three.js",
    link: "#",
    git: "#",
    src: proj3,
    type: "frontend",
  },
];

export const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative py-24 md:py-32 px-4 bg-[#000000] text-white" id="portfolio">
      <div className="container mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
        >
          A small selection of <span className="text-red-600">recent projects</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-white/60 mb-16 max-w-2xl mx-auto"
        >
          Selected works showcasing innovative solutions and clean design
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="glass-card h-full rounded-2xl overflow-hidden border border-white/10"
                initial={{ height: "400px" }}
                animate={{ 
                  height: hoveredIndex === index ? "450px" : "400px"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <motion.img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredIndex === index ? 1.05 : 1 
                    }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    initial={{ color: "#ffffff" }}
                    animate={{ 
                      color: hoveredIndex === index ? "#ef4444" : "#ffffff" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/70 mb-4">{project.desc}</p>
                        <p className="text-red-600 text-sm mb-3">
                          {project.devstack}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4">
                    <span className="text-sm text-white/60 capitalize">
                      {project.type}
                    </span>
                    <div className="flex space-x-3">
                      <a 
                        href={project.git} 
                        className="text-white/70 hover:text-white transition-colors duration-150"
                        aria-label="GitHub repository"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a 
                        href={project.link} 
                        className="text-white/70 hover:text-white transition-colors duration-150"
                        aria-label="Live demo"
                      >
                        <HiOutlineExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.2s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
        }
      `}</style>
    </div>
  );
};