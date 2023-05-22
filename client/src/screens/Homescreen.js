import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getallrooms"
        );
        const { rooms } = response.data;
        setRooms(rooms);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-4">
                <Room room={room} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
