// Testimonials.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./testimonials.css";
import axiosInstance, { websiteImageLink } from "../../../api";

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
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
  const fetchAlltestimonials = async () => {
    try {
      const response = await axiosInstance.get(
        "/frontend-home-page/reviews/all"
      );
      console.log(response.data.data.allReview);

      setAllTestimonials(response.data.data.allReview);
    } catch (err) {
      console.error("Error fetching Testimonail:", err);
    }
  };

  useEffect(() => {
    fetchAlltestimonials();
  }, []);

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
      {allTestimonials ? (
        <>
          <Slider {...settings}>
            {allTestimonials.map((testi) => (
              <div key={testi?.id} className="testimonial">
                <img src={websiteImageLink(testi.image)} alt={testi.id} />
                <p>"{testi.review}"</p>
                <h4>- {testi?.name}</h4>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <>
          <Slider {...settings}>
            {testimonials.map((testi) => (
              <div key={testi.id} className="testimonial">
                <img src={testi.image} alt={testi.name} />
                <p>"{testi.feedback}"</p>
                <h4>- {testi.name}</h4>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default Testimonials;
