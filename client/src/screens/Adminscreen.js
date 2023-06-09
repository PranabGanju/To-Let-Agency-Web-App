import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  const { TabPane } = Tabs;
  return (
    <div className=" mt-3 ml-3 mr-3 bsw">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

// Booking Component for Admin panel
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-striped table-dark">
          <thead className="thead-dark bsw">
            <tr className="text-center">
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr className="text-center">
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.frommonth}</td>
                    <td>{booking.tomonth}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Room Component for Admin panel
export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        console.log("API response:", response.data);
        setRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark table-striped">
          <thead className="thead-dark bsw">
            <tr className="text-center">
              <th>Room Id</th>
              <th>Name</th>
              <th>Size</th>
              <th>Furnishing</th>
              <th>Parking</th>
              <th>Rent Per Month</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr className="text-center">
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.size}</td>
                    <td>{room.furnishing}</td>
                    <td>{room.parking}</td>
                    <td>{room.rentpermonth}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Room Component for Admin panel

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered text-center table-striped">
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : " NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add room Component for Admin panel

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
        {loading && <Loader />}
        <div className="col-md-5">
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
