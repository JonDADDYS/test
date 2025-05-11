import { Hero } from "./pages/Hero";
import { useState } from "react";
import { About } from "./pages/About";
import { LoadingScreen } from "./pages/LoadingScreen";
import { Banner } from "./pages/Banner";
import { Portfolio } from "./pages/Portfolio";
import { Stack } from "./pages/Stack";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";



export default function App() {
 
  return (
    <>
     

       <Navbar/>
        <Hero />
        <About />
     

        
    </>
  );
}

