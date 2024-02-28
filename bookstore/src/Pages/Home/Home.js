import React from "react";
import "./Home.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Biography from "../../Components/Biography/Biography";
import BestBooks from "../../Components/BestBooks/BestBooks";
import Footer from "../../Components/Footer/Footer";

function Home() {
  return (
    <div>
      <HeroSection />
      <Biography />
      <BestBooks />
      <Footer />
    </div>
  );
}

export default Home;
