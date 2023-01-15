import React, { useState } from "react";
import { Link } from "react-router-dom";
import hidePassword from "./../../assets/hide-password.svg";
import showPassword from "./../../assets/show-password.svg";
import "./user.scss";
import { signin } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Toast from "../common/Toast/Toast";
import { setToastProperties } from "../../Utils/commonMethods";

const Signin = () => {
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState({});
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState([]);

  let navigate = useNavigate();

  const handleChecked = () => setChecked(!checked);

  const handleChange = (evt) => {
    setList([]);
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const authenticate = (token, user, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      next();
    }
  };

  const onSignin = (event) => {
    event.preventDefault();
    const { email, password } = value;

    const data = {
      email,
      password,
    };

    signin(data).then((res) => {
      if (res.error === true) {
        setToastProperties(res.message, "error", setList, list);
        console.log(res.message);
      } else {
        authenticate(res.data.token, res.data.user, () => {
          navigate("/home");
        });
        console.log(res.message);
      }
    });

    console.log(data);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="absolute top-2 right-2">
        <span>
          New here{" "}
          <span
            className="font-bold text-lg font-mono underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </span>
      </div>
      <div className="p-6 bg-clear-chill rounded-xl">
        <h1 className="mt-4 text-4xl font-semibold text-center text-white ">
          Login
        </h1>
        <form className="w-full lg:w-96">
          <div className="mb-3">
            <label className="mb-3 font-semibold text-gray-900 text-md ">
              Email
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="name@example.com"
                onChange={(evt) => handleChange(evt)}
              ></input>
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-900 text-md">
              Password
            </label>
            <input
              type={isShow ? "text" : "password"}
              name="password"
              className="bg-gray-50 border  mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5"
              onChange={(evt) => handleChange(evt)}
              required
            />
            <div className="password-icon">
              <img
                className="w-5 h-auto -mt-8 cursor-pointer "
                alt=""
                src={isShow ? hidePassword : showPassword}
                onClick={() => setIsShow((prvState) => !prvState)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <label className="font-medium text-gray-900">
              <Link to="/forgotpassword">Forgot password</Link>
            </label>
          </div>
          <div className="flex items-start mb-10">
            <div className="flex items-center h-5">
              <input
                name="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                onChange={handleChecked}
                checked={checked}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-900">Remember me</label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={(evt) => onSignin(evt)}
              className="text-white bg-georgia-peach  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toast
        toastList={list}
        position={"bottom-right"}
        autoDelete={false}
        autoDeleteTime={3000}
      />
    </div>
  );
};

export default Signin;
