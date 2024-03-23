import React, { useContext } from "react";
import "./Home.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Biography from "../../Components/Biography/Biography";
import BestBooks from "../../Components/BestBooks/BestBooks";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";

function Home() {
  console.log(useContext(AuthContext));
  return (
    <div>
      <HeroSection />
      <Biography />
      <BestBooks
        title={"Best Selling Books"}
        api={
          "https://api.themoviedb.org/3/movie/popular?language=eng&api_key=da4e0d3bd6b4f860b5788aa43ae24d86"
        }
      />
      <BestBooks
        title={"Best Rating Books"}
        api={"http://127.0.0.1:8000/best-rated-books/"}
      />
      <Footer />
    </div>
  );
}

export default Home;
