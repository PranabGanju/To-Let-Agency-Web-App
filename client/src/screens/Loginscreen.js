import React, { useState, useEffect } from "react";
import axios from "axios";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      const result = await axios.post("/api/users/login", user).data;
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
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
