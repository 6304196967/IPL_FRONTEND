import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/notfound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="animation-container">
          <div className="ghost">
            <div className="face">
              <div className="eye left"></div>
              <div className="eye right"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page not found</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button onClick={() => navigate(-1)} className="go-back-btn">
          Go Back
        </button>
        <button onClick={() => navigate("/")} className="home-btn">
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;