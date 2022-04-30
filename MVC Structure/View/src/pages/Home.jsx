import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Headline from "../components/Headline";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: black;
    color: white;
    font-weight: 600;
    border: none;
    font-size: 20px;
    cursor: pointer;
  `;
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Headline text={"Upcoming Items"} />
      <Categories />
      <Headline text={"Newly Added Meals"} />
      <Products type={"newItems"} />
      <Button>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/productlist"
        >
          SHOW ALL MEALS ▶
        </Link>
      </Button>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
