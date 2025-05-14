import { Hero } from "./pages/Hero";
import { useState } from "react";
import { About } from "./pages/About";
import { LoadingScreen } from "./pages/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Menu } from "./pages/Menu";
import {Galleria} from "./pages/Galleria";
import { Recensioni } from "./pages/Recensioni";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Menu/>
          <Galleria />
          <Recensioni />
         
        </>
      )}
    </>
  );
}