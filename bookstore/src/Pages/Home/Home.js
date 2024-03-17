import React, { useContext } from "react";
import "./Home.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Biography from "../../Components/Biography/Biography";
import BestBooks from "../../Components/BestBooks/BestBooks";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";

function Home() {
  console.log(useContext(AuthContext))
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
