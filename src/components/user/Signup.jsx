import React,{ useState } from "react";
import hidePassword from "./../../assets/hide-password.svg";
import showPassword from "./../../assets/show-password.svg";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import {signup} from "../../services/UserService";
import Toast from "../common/Toast/Toast";
import {setToastProperties} from "../../Utils/commonMethods"


const Signup = () => {
  const [field, setField] = useState({});
  const [effect, setEffect] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [list, setList] = useState([]);
  
  let navigate = useNavigate();

  const handleChange = (evt) => {
    setList([]);
    setField({ ...field, [evt.target.name]: evt.target.value });
  };

  const onSignup = (event) => {
    event.preventDefault();
    console.log(event)
    const { firstName, lastName, userName, email, password, confirmPassword } =
      field;
    const user = {
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    };

    signup(user).then((res) => {
      if (res.error === true) {
        setToastProperties(res.message,'error',setList,list)
      } else {
        console.log(user);
        navigate("/activate", { state: { email: user.email } });
      }
    });
  };
  return (
    <div className="grid h-screen place-items-center">
      <div className="p-6 bg-clear-chill rounded-xl">
        <h1 className="mt-4 font-mono text-4xl font-semibold text-center text-white ">
          SIGNUP
        </h1>
        <form className="grid w-full mt-4 lg:w-2/4 lg:ml-60 place-items-center">
          <div className="flex flex-wrap sm:w-full">
            <div className="w-full px-3 mt-4 md:w-1/2 md:mb-0">
              <label className="font-mono font-semibold text-white">
                <span className="text-red-600">*</span>FIRST NAME
              </label>
              <input
                className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
                type="text"
                name="firstName"
                placeholder="John"
                onChange={(evt) => handleChange(evt)}
              ></input>
            </div>
            <div className="w-full px-3 mt-4 md:w-1/2 md:mb-0">
              <label className="font-mono font-semibold text-white ">
                LAST NAME
              </label>
              <input
                className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
                type="text"
                name="lastName"
                placeholder="Doe"
                onChange={(evt) => handleChange(evt)}
              ></input>
            </div>
          </div>
          <div className="w-full px-3 mt-4 lg:w-1/2">
            <label className="font-mono font-semibold text-white">
              <span className="text-red-600">*</span>USERNAME
            </label>
            <input
              className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
              type="text"
              name="userName"
              placeholder="Nick Name"
              onChange={(evt) => handleChange(evt)}
            ></input>
          </div>
          <div className="w-full px-3 mt-4 lg:w-full">
            <label className="font-mono font-semibold text-white">
              <span className="text-red-600">*</span>EMAIL
            </label>
            <input
              className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
              type="email"
              name="email"
              placeholder="Doe@example.com"
              onChange={(evt) => handleChange(evt)}
            ></input>
          </div>
          <div className="flex flex-wrap justify-center mt-4 mb-6 sm:w-full">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="font-mono font-semibold text-white">
                <span className="text-red-600">*</span>PASSWORD
              </label>
              <input
                className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
                type={isShow ? "text" : "password"}
                name="password"
                onChange={(evt) => handleChange(evt)}
              ></input>
              <img
                className="w-5 h-auto -mt-8 cursor-pointer ml-44"
                alt=""
                src={isShow ? hidePassword : showPassword}
                onClick={() => setIsShow((prvState) => !prvState)}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="font-mono font-semibold text-white">
                <span className="text-red-600">*</span>CONFIRM PASSWORD
              </label>
              <input
                className="w-full mt-3 font-mono font-semibold text-black placeholder-gray-400 bg-white form-input rounded-xl"
                type="text"
                name="confirmPassword"
                onChange={(evt) => handleChange(evt)}
              ></input>
            </div>
          </div>
          <button
            onClick={(evt) => {
              onSignup(evt);
              setEffect(true);
            }}
            className={`${
              effect && "animate-wiggle"
            }  text-white bg-georgia-peach mt-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-2.5 text-center`}
            onAnimationEnd={() => setEffect(false)}>
            Signup
          </button>
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

export default Signup;
