import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";



function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function login() {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const result = response.data;
      setLoading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "You have been logged in successfully!",
      }).then(() => {
        window.location.href = "/home"; // Redirect to the home screen
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      localStorage.removeItem("currentUser");
    }
  }

  
  

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {error && <Error message="Invalid Credentials" />}

          <div className="bsw">
            <h2>Login</h2>

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

            <div className="text-center">
              <button className="btn btn-primary mt-3" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
