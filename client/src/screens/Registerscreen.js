import React, { useState } from "react";
import axios from "axios";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        const result = await axios.post("/api/users/register", user).data;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("passwords doesnot match");
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
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
              <button className="btn btn-primary mt-3" onClick={register}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
