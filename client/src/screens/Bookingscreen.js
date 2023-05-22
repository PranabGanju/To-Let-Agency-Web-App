import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const { roomid } = useParams();

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

    fetchRoomData();
  }, [roomid]);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : room ? 
       (
        <div className="m-5">
          <div className="row justify-content-center mt-5 bsw">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg1" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {room.name} </p>
                  <p>Size: {room.size} </p>
                  <p>Furnishing: {room.furnishing} </p>
                  <p>Location: {room.location} </p>
                  <p>Parking : {room.parking} </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Rent Per Month : {room.rentpermonth} </p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ): (<Error/>)}
    </div>
  );
}

export default Bookingscreen;
