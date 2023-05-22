import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

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
    <div className='container'>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-4">
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
