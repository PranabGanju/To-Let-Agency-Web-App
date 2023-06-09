import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

function Room({ room, frommonth, tomonth }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bsw" data-aos="fade-up">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-12">
            <h1>{room.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <b>Size:</b> <span className="bold-text">{room.size}</span>
            </p>
            <p>
              <b>Rent:</b>{" "}
              <span className="bold-text">{room.rentpermonth}</span>
            </p>
            <p>
              <b>Contact:</b>{" "}
              <span className="bold-text">{room.phonenumber}</span>
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <b>Furnishing:</b>{" "}
              <span className="bold-text">{room.furnishing}</span>
            </p>
            <p>
              <b>Parking:</b> <span className="bold-text">{room.parking}</span>
            </p>
            <p>
              <b>Location:</b>{" "}
              <span className="bold-text">{room.location}</span>
            </p>
          </div>
        </div>
        <div style={{ float: "right" }}>
          {frommonth && tomonth && (
            <Link to={`/book/${room._id}/${frommonth}/${tomonth}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="Room" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
