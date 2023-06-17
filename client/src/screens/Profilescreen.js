import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { TabPane } = Tabs;

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Profile" key="1" className="text-center">
          <h1>My Profile </h1>

          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>isAdmin : {user.isAdmin ? "YES" : "NO"}</h1>
          <h1>isOwner : {user.isOwner ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <p>
            <MyBookings />
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });
        console.log(response.data);
        setbookings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Your Booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 ml-4 mr-4">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bsw2">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId :</b> {booking._id}
                  </p>
                  <p>
                    <b>TransactionId :</b> {booking.transactionId}{" "}
                  </p>
                  <p>
                    <b>Start Month :</b> {booking.frommonth}
                  </p>
                  <p>
                    <b>End Month :</b> {booking.tomonth}
                  </p>
                  <p>
                    <b>Amount :</b> {booking.totalamount}{" "}
                  </p>
                  <p>
                    <b>Status :</b>
                    {booking.status == "cancelled" ? (
                      <Tag color="volcano">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomid)
                        }
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
