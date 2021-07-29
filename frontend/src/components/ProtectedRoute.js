import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = (props) => {
  return (
    <Route>
      {() => (props.loggedIn ? props.children : <Redirect to="/sign-in" />)}
    </Route>
  );
};

export default ProtectedRoute;
