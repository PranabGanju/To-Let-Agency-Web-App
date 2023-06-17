import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";

const { TabPane } = Tabs;
const Ownerscreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { TabPane } = Tabs;

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isOwner) {
      window.location.href = "/home";
    }
    if (!user) {
      window.location.href = "/owner";
    }
  }, []);

  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Owner" key="1" className="text-center">
            <h1>My Profile</h1>
            <br />
            {loading ? (
              <Loader />
            ) : error ? (
              <Error message="Failed to fetch user data" />
            ) : (
              <div>
                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h1>isOwner: {user.isOwner ? "YES" : "NO"}</h1>
              </div>
            )}
          </TabPane>
          <TabPane tab="Add Room" key="2">
            <p>
              <Addroom />
            </p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Ownerscreen;

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

function Addroom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [rentpermonth, setrentpermonth] = useState();
  const [size, setsize] = useState();
  const [furnishing, setfurnishing] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [location, setlocation] = useState();
  const [parking, setparking] = useState();
  const [pincode, setpincode] = useState();
  const [description, setdescription] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addRoom() {
    const newroom = {
      name,
      rentpermonth,
      size,
      furnishing,
      phonenumber,
      location,
      parking,
      pincode,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/rooms/addroom", newroom)
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Your New Room Added Successfully", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Something Went Wrong", "error");
    }
  }

  return (
    <div>
      <div className="row ml-5 mr-5 bsw">
        <div className="col-md-5">
          {loading && <Loader />}
          <input
            type="text"
            className="form-control"
            placeholder="Room Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Rent per month"
            value={rentpermonth}
            onChange={(e) => {
              setrentpermonth(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Size"
            value={size}
            onChange={(e) => {
              setsize(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Furnishing"
            value={furnishing}
            onChange={(e) => {
              setfurnishing(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => {
              setphonenumber(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setlocation(e.target.value);
            }}
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Parking"
            value={parking}
            onChange={(e) => {
              setparking(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              setpincode(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Url 1"
            value={imageurl1}
            onChange={(e) => {
              setimageurl1(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Url 2"
            value={imageurl2}
            onChange={(e) => {
              setimageurl2(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Url 3"
            value={imageurl3}
            onChange={(e) => {
              setimageurl3(e.target.value);
            }}
          />
        </div>

        <div className="col-md-12 text-center mt-3">
          <button
            className="btn btn-primary"
            style={{ marginBottom: "20px" }}
            onClick={addRoom}
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
