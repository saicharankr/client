import { useState } from "react";
import {activate} from "../../services/UserService";
import { useNavigate ,useLocation} from "react-router-dom";

const Activate = () => {
  const { state } = useLocation();
  const { email } = state; // Read values passed on state
  const [value, setValue] = useState({});
  const [show, setShow] = useState(true);

  let navigate = useNavigate();

  const handleChange = (evt) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { code } = value;
    const data = {
      email: email,
      code: code,
    };
    activate(data).then((res) => {
      if (res.error === true) console.log(res.message);
      else setShow(false);
    });
  };

  const navigateToSignin = (evt) => {
    evt.preventDefault();
    navigate("/");
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="p-6 bg-clear-chill rounded-xl">
        {show ? (
          <div>
            <h3 className="font-mono font-semibold text-center text-white">
              Please Verify your email to activate the account
            </h3>
            <form>
              <div className="mt-2 mb-6">
                <input
                  type="text"
                  name="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Activation Code"
                  onChange={(evt) => handleChange(evt)}
                  required
                ></input>
              </div>
              <button
                onClick={(evt) => onSubmit(evt)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Activate
              </button>
            </form>
            <h6 className="py-2 font-mono text-xs font-semibold">
              * Activation code as been sent your email id which is valid for 15
              mins
            </h6>
          </div>
        ) : (
          <div>
            <h1 className="font-mono font-semibold text-center text-white">
              Your email has been verified successfully !!
            </h1>
            <p className="font-mono font-semibold text-center text-white">
              Click on signin to login into you account
            </p>
            <button
              onClick={(evt) => navigateToSignin(evt)}
              className="text-white bg-georgia-peach hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Signin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activate;
