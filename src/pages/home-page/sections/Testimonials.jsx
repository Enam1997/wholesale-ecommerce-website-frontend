// Testimonials.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./testimonials.css";
import axiosInstance, { websiteImageLink } from "../../../api";
import SectionTitle from "../../../component/section-title/SectionTitle";

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const defaultTestimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback: "Exceptional service and top-quality products!",
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Fast delivery and great customer service.",
      image:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      feedback: "The best shopping experience I've ever had!",
      image:
        "https://img.freepik.com/free-photo/handsome-man-white-shirt-isolated_53876-62768.jpg",
    },
  ];

  const fetchAllTestimonials = async () => {
    try {
      const response = await axiosInstance.get(
        "/frontend-home-page/reviews/all"
      );
      setAllTestimonials(response.data.data.allReview);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  useEffect(() => {
    fetchAllTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    slidesToShow: 3, // Shows 3 testimonials on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const testimonialsToShow = allTestimonials.length
    ? allTestimonials
    : defaultTestimonials;

  return (
    <div className="testimonials-section">
      <SectionTitle title={"What Our Customers Say"} />
      <Slider {...settings}>
        {testimonialsToShow.map((testi) => (
          <div key={testi.id} className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-header">
                <img
                  src={
                    allTestimonials.length
                      ? websiteImageLink(testi.image)
                      : testi.image
                  }
                  alt={testi.name}
                  className="testimonial-image"
                />
                <h4 className="testimonial-name">{testi.name}</h4>
              </div>
              <p className="testimonial-feedback">
                "{testi.review || testi.feedback}"
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
