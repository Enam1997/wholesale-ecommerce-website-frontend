import React from 'react';
import './footer.css';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__sections">
        <div className="footer__section">
          <h3>About Us</h3>
          <p>
            We are a leading e-commerce platform providing a wide range of products to our customers.
            Our mission is to deliver quality products at the best prices.
          </p>
        </div>
        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer__socials">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><LinkedIn /></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
