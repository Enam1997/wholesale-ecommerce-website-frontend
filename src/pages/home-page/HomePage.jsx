import React from "react";
import "./homePage.css";

import Categories from "./sections/Categories";
import NewProducts from "./sections/NewProducts";
import RecommendedProducts from "./sections/RecommendedProducts";
import Testimonials from "./sections/Testimonials";
import BestSellingProducts from "./sections/BestSellingProducts";
import PromotionalCards from "./sections/PromotionalCards";
import BlogPreview from "./sections/BlogPreview";
import NewsletterSubscription from "./sections/NewsletterSubscription";

import Hero from "./sections/Hero";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <NewProducts />
      <RecommendedProducts />
      <Testimonials />
      <BestSellingProducts />
      <PromotionalCards />
      <BlogPreview />
      <NewsletterSubscription />
     
    </div>
  );
};

export default HomePage;
