import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import moment from "moment";
import "antd/dist/reset.css";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [fromMonth, setFromMonth] = useState();
  const [toMonth, setToMonth] = useState();
  const [rentalrooms, setRentalRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getallrooms"
        );
        const { rooms } = response.data;
        setRooms(rooms);
        setRentalRooms(rooms.sort((a, b) => a._id.localeCompare(b._id))); // Sort rooms based on their order in the database
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  function filterByMonth(dates) {
    const [startMonth, endMonth] = dates;
    const fromMonth = startMonth.startOf("month").format("YYYY-MM-DD");
    const toMonth = endMonth.endOf("month").format("YYYY-MM-DD");

    setFromMonth(startMonth.startOf("month").format("MMMM YYYY"));
    setToMonth(endMonth.endOf("month").format("MMMM YYYY"));

    applyFilters(fromMonth, toMonth);
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    applyFilters(fromMonth, toMonth, event.target.value);
  }

  function applyFilters(fromMonth, toMonth, searchQuery = "") {
    const tempRooms = rentalrooms.filter((room) => {
      let isAvailable = true;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          const fromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const toDate = moment(booking.todate, "DD-MM-YYYY");

          if (
            fromDate.isBetween(fromMonth, toMonth, undefined, "[]") ||
            toDate.isBetween(fromMonth, toMonth, undefined, "[]") ||
            (fromDate.isSameOrBefore(fromMonth) &&
              toDate.isSameOrAfter(toMonth))
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      return isAvailable;
    });

    // Apply search filter to tempRooms based on location
    const filteredRooms = tempRooms.filter((room) =>
      room.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setRooms(filteredRooms);
  }

  return (
    <div className="container">
      <div className="row mt-5 bsw">
        <div className="col-md-3 ">
          <RangePicker
            picker="month"
            format="MMMM YYYY"
            onChange={filterByMonth}
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-9 mt-4" key={room._id}>
              <Room room={room} frommonth={fromMonth} tomonth={toMonth} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
