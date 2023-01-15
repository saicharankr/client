import React, { useState } from "react";
import Toast from "../common/Toast/Toast";
import { setToastProperties } from "../../Utils/commonMethods";
import hidePassword from "./../../assets/hide-password.svg";
import showPassword from "./../../assets/show-password.svg";
import { resetPassword } from "../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [value, setValue] = useState({});
  const [list, setList] = useState([]);
  const [isShow, setIsShow] = useState(false);

  let navigate = useNavigate();
  const { code } = useParams();

  const handleChange = (evt) => {
    setList([]);
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { newPassword, confirmPassword } = value;

    const data = {
      newPassword,
      confirmPassword,
      token: code,
    };
    console.log(data);
    resetPassword(data).then((res) => {
      if (res.error === true) {
        setToastProperties(res.message, "error", setList, list);
      } else {
        setToastProperties(res.message, "success", setList, list);
        navigate("/signin");
      }
    });
  };
  return (
    <div className="grid h-screen place-items-center">
      <div className="p-6 bg-clear-chill rounded-xl">
        <form className="w-96">
          <div className="mb-4">
            <label className="font-semibold text-gray-900 text-md">
              New Password
            </label>
            <input
              type={isShow ? "text" : "password"}
              name="newPassword"
              className="bg-gray-50 border  mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5"
              onChange={(evt) => handleChange(evt)}
              required
            />
            <div className="absolute password-icon">
              <img
                className="w-5 h-auto -mt-8 cursor-pointer"
                alt=""
                src={isShow ? hidePassword : showPassword}
                onClick={() => setIsShow((prvState) => !prvState)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-900 text-md">
              Confirm Password
            </label>
            <input
              type={isShow ? "text" : "password"}
              name="confirmPassword"
              className="bg-gray-50 border  mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5"
              onChange={(evt) => handleChange(evt)}
              required
            />
            <div className="absolute password-icon">
              <img
                className="w-5 h-auto -mt-8 cursor-pointer"
                alt=""
                src={isShow ? hidePassword : showPassword}
                onClick={() => setIsShow((prvState) => !prvState)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={(evt) => onSubmit(evt)}
              className="text-white bg-georgia-peach  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-2.5 text-center"
            >
              Reset
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

export default ResetPassword;
