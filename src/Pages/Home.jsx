import React, { useEffect } from 'react';
import '../style/Home.css'; // Import custom CSS file for Home page styling
import BILLING from '../images/bill.png'; // Import image using ES6 import syntax
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Correctly initialize useNavigate
  useEffect(() => {
    // Add classes to trigger animations after component mounts
    const heading = document.querySelector('.dummy-heading h1');
    const paragraph = document.querySelector('.dummy-heading p');
    const button = document.querySelector('.dummy-heading button');
    const image = document.querySelector('.home-image');


    heading.classList.add('fade-in');
    paragraph.classList.add('fade-in');
    button.classList.add('slide-in');
    image.classList.add('zoom-in');
  }, []);

  const handleExplore = () => {
    navigate("/slip-history");
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="dummy-heading">
          <h1 className='button-container'>Welcome to Our Website!</h1>
          <p className='button-container'>This is a dummy heading statement. Replace it with your content.</p>
          <div className="button-container">
            <button className="btn btn-primary" onClick={handleExplore}>Explore More</button>
          </div>
        </div>
        <div className="home-image-container">
          <img src={BILLING} alt="Home" className="home-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
