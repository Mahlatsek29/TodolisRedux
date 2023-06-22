import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("");

  const navigate = useNavigate();

  const isValidated = () => {
    let isProceed = true;
    let errorMessage = " Please enter a value for";

    if (id === null || id === '') {
      isProceed = false;
      errorMessage += ' Username';
    }

    if (name === null || name === '') {
      isProceed = false;
      errorMessage += " Full Name,";
    }

    if (password === null || password === '') {
      isProceed = false;
      errorMessage += " Password,";
    }

    if (email === null || email === '') {
      isProceed = false;
      errorMessage += " Email,";
    }

    if (!isProceed) {
      errorMessage = errorMessage.slice(0, -1);
      toast.warning(errorMessage);
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = {
      id,
      name,
      password,
      email,
      phone,
      address,
      gender,
    };
    if (isValidated()) {
      // conole.log(regobi);
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered successfully");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card-header">
            <h1> User Registration</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Phone <span className="errmsg">*</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Address <span className="errmsg">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Gender <span className="errmsg">*</span>
                  </label>
                  <br />
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={() => genderchange("male")}
                    name="gender"
                    value="male"
                    className="app-check"
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={() => genderchange("female")}
                    name="gender"
                    value="female"
                    className="app-check"
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
          <button type="submit" className="btn btn-primary">Register</button> |
          <Link to="/login" className="btn btn-danger">Close</Link>
          <Link to="/home" className="btn btn-primary">Home</Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
