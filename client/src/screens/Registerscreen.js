import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";


function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const[success,setsuccess] = useState();

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const result = await axios.post("/api/users/register", user).data;
        setLoading(false)
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')

      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true)
      }
    } else {
      alert("passwords doesnot match");
    }
  } 

  return (
    <div>
      {loading && Error(<Loader/>)}
      {error && (<Error/>)}
       <div className="row justify-content-center mt-5">
        <div className="col-md-5">
        {success && (<Success message = "Registration Success" />)}
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
