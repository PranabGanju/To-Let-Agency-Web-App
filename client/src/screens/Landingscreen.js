import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-10 text-center"
        style={{ borderRight: " 10px solid White " }}
      >
        <h2 data-aos="zoom-in" style={{ color: "black", fontSize: "100px" }}>
          To-Let Web Agency
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "black" }}>
          Agency That Can Help
        </h1>

        <Link to="/home">
          <button className="btn landingbtn">
            <b>Get Started</b>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
