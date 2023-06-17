import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login";


function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);

        const instance = axios.create({
          timeout: 5000, // set the timeout to 5 seconds
        });

        const result = await instance.post("/api/users/register", user).data;

        setLoading(false);
        setsuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");

        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: "You have been registered successfully!",
        }).then(() => {
          window.location.href = "/login"; // Redirect to the login screen
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Passwords do not match");
    }
  }

  const responseGoogle = (response) => {
    // Handle Google sign-up response here
    console.log(response);
  };

  

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {success && <Success message="Registration Success" />}
          <div className="bsw text-center">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <div className="text-center">
              <button
                className="btn btn-primary mt-3"
                onClick={register}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <div className="text-center mt-5">
              <div>
                <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  buttonText="Sign up with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
