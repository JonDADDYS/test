import React, { useEffect } from "react";
import { SiAdobexd, SiReact } from "react-icons/si";
import { FaJava, FaJsSquare, FaHtml5 } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const stackItems = [
  {
    id: 1,
    name: "Adobe XD",
    icon: <SiAdobexd size={100} />,
    color: "text-red-600",
  },
  {
    id: 2,
    name: "JavaScript",
    icon: <FaJsSquare size={100} />,
    color: "text-red-600",
  },
  {
    id: 3,
    name: "React",
    icon: <SiReact size={100} />,
    color: "text-red-600",
  },
  {
    id: 4,
    name: "HTML & CSS",
    icon: <FaHtml5 size={100} />,
    color: "text-red-600",
  },
  {
    id: 5,
    name: "Java",
    icon: <FaJava size={100} />,
    color: "text-red-600",
  },
];

export const Stack = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section
      className="py-24 md:py-64 max-w-[1200px] mx-auto text-center"
      id="stack"
    >
     <h2 className="text-7xl text-gray-100 font-bold mb-20">My <span className="text-red-600">Stack</span></h2>
      <div className="flex flex-wrap justify-center gap-8" ref={ref}>
        {stackItems.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: (index) => ({
                opacity: 0,
                y: index % 2 === 0 ? -100 : 100,
              }),
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            className="bg-white/10 flex flex-col items-center justify-center w-[200px] h-[200px] rounded-xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className={`mb-4 ${item.color}`}>{item.icon}</div>
            <p className="text-white/20 text-xl">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};