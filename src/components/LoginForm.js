import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";

export default function LoginForm(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState({ usename: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setError(false);
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    if (user.username === "kminchelle" && user.password === "0lelplR") {
      fetch("https://dummyjson.com/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          alert("ورود موفقیت آمیز بود");
          navigate("Products");
        })
        .catch(() => {})
        .finally(() => {
          setUser({ username: "", password: "" });
          setError(false);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="Login-form-container">
            <div className="Login-form-content">
              <div className="form-group mt-3">
                <label>نام کاربری</label>
                <input
                  type="text"
                  name="username"
                  className="form-control mt-1"
                  placeholder="نام کاربری را وارد کنید"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="پسورد را وارد کنید"
                  onChange={handleChange}
                />
              </div>
              {error && (
                <p className="error">نام کاربری یا رمز عبور اشتباه است </p>
              )}
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  ورود به حساب کاربری
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                <a href="#">رمز عبور را فراموش کردم</a>
              </p>
            </div>
            <div className="col-6">
              <img src={logo} alt="React-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
