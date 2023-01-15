import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/core/Home";
import Signup from "./components/user/Signup";
import Activate from "./components/user/Activate";
import Test from "./components/user/Test";
import Signin from "./components/user/Signin";
import ForgotPassword from "./components/user/ForgotPassword";
import ProtectedRoute from "./components/core/ProtectedRoute";
import ResetPassword from "./components/user/ResetPassword";

export const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<ProtectedRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/activate" element={<Activate />}></Route>
        <Route exact path="/test" element={<Test />}></Route>
        <Route exact path="/" element={<Signin />}></Route>
        <Route
          exact
          path="/resetPassword/code=:code"
          element={<ResetPassword />}
        ></Route>
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPassword />}
        ></Route>
      </Routes>
    </div>
  );
};
