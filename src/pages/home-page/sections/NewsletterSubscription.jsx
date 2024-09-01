// NewsletterSubscription.js
import React from "react";
import "./newsletterSubscription.css";

const NewsletterSubscription = () => {
  return (
    <div className="newsletter">
      <h2>Subscribe to our Newsletter</h2>
      <p>Get the latest updates and offers.</p>
      <form className="newsletter__form">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit" className="btn">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
