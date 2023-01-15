import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  const isAuthenticated = () => {
    if (typeof window == undefined) return false;
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="bg-clear-chill h-14 rounded-b-3xl">
        {location.pathname !== "/" ? (
          <div className="flex justify-start gap-5 p-4 px-8 font-mono text-xl text-white">
            <NavLink to="/signin" activeClassName="active">
              Signin
            </NavLink>
            <NavLink activeClassName="active" to="/signup">
              Signup
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-start gap-5 p-4 px-8 font-mono text-xl text-white">
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink
                activeClassName="active"
                to="/signin"
                onClick={() => localStorage.clear()}
              >
                Signout
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
