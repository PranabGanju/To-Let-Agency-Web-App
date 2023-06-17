import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const { roomid, frommonth, tomonth } = useParams();
  const navigate = useNavigate();

  const fromDate = moment(frommonth, "MMMM YYYY");
  const toDate = moment(tomonth, "MMMM YYYY");
  const totalmonths = toDate.diff(fromDate, "months");
  const totalamount = totalmonths * room.rentpermonth;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rooms/getroomsbyid/${roomid}`);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    if (!localStorage.getItem("currentUser")) {
      setError(true);
      setLoading(false);
    } else {
      fetchRoomData();
    }
  }, [roomid]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      roomid,
      frommonth,
      tomonth,
      totalmonths,
      totalamount,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room is Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/bookings";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Sorry", "Something Went Wrong", "error");
    }
  }

  if (loading) {
    return <Loader />;
  } else if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "You need to be logged in to access this page",
    }).then(() => {
      navigate("/login");
    });
    return null;
  }

  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5 bsw">
        <div className="col-md-6">
          <h1>{room.name}</h1>
          <img src={room.imageurls[0]} className="bigimg1" alt="" />
        </div>

        <div className="col-md-6">
          <div style={{ textAlign: "right" }}>
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>
                Name: {JSON.parse(localStorage.getItem("currentUser")).name}
              </p>
              <p>Size: {room.size}</p>
              <p>Location: {room.location}</p>
              <p>From Month: {frommonth}</p>
              <p>To Month: {tomonth}</p>
            </b>
          </div>

          <div style={{ textAlign: "right" }}>
            <b>
              <h1>Amount</h1>
              <hr />
              <p>No of Months: {totalmonths}</p>
              <p>Rent Per Month: {room.rentpermonth}</p>
              <p>Total Amount: {totalamount}</p>
            </b>
          </div>

          <div style={{ float: "right" }}>
            <StripeCheckout
              amount={totalamount * 100}
              token={onToken}
              currency="INR"
              stripeKey="pk_test_51NCPxOSFe2XCu71R5TJ4NNbNhhpkJQMfvVO84DPCFgJaWUQQpnBtDGd8cMNb4klyRTuwXzBSfXAGnHYiv3zK2KId00rlIyprwK"
            >
              <button className="btn btn-primary">Pay Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingscreen;
