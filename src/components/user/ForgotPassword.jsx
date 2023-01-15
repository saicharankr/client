import React, { useState } from "react";
import Toast from "../common/Toast/Toast";
import {forgotPassword} from "../../services/UserService";
import {setToastProperties} from "../../Utils/commonMethods";
import { useNavigate } from "react-router-dom";
import { timeout } from "../../Utils/commonMethods";

const ForgotPassword = () => {


    const [value, setValue] = useState({});
    const [list, setList] = useState([]);
    let navigate = useNavigate();
    const handleChange = (evt) => {
        setList([]);
        setValue({ ...value, [evt.target.name]: evt.target.value });
      };

    const onSubmit = (evt) => {
        evt.preventDefault();
        const { email } = value;

        const data = {
            email,
          };
          forgotPassword(data).then((res) => {
            if(res.error === true ) {
              setToastProperties(res.message,'error',setList,list)
            }
            else{
              setToastProperties(res.message,'success',setList,list)
              setValue([])
              timeout(2000).then(() => navigate("/signin"))
            }
          })
    }

    return (
        <div className="grid h-screen place-items-center">
        <div className="p-6 bg-clear-chill rounded-xl">
          <form className="w-96">
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
            <div className="flex justify-center">
              <button
                onClick={(evt) => onSubmit(evt)}
                className="text-white bg-georgia-peach  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-2.5 text-center"
              >
                Submit
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
    )
}

export default ForgotPassword
