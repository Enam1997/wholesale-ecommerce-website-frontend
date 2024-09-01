// Testimonials.js
import React from "react";
import Slider from "react-slick";
import "./testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "Amazing products and great customer service! Amazing products and great customer service! Amazing products and great customer service! Amazing products and great customer service! Amazing products and great customer service!",
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Fast delivery and the quality is top-notch.",
      image:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
    },
    // Add more testimonials as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="testimonials">
      <h2>What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonials.map((testi) => (
          <div key={testi.id} className="testimonial">
            <img src={testi.image} alt={testi.name} />
            <p>"{testi.feedback}"</p>
            <h4>- {testi.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
