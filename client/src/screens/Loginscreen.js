import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
  

      localStorage.setItem('currentUser' , JSON.stringify(result));
      window.location.href = '/home';

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      localStorage.removeItem("currentUser");
    }
  }

  return (
    <div>
        {loading && Error(<Loader/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        {error && (<Error message = "Invalid Credentials"/>)}

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
