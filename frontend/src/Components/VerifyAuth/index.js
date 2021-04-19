import { Redirect } from "react-router-dom";

const VerifyAuth = (Component, redirect) => {
  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem("token");
    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to={redirect || '/login'} />;
    }
  };

  return AuthRoute;
};

export default VerifyAuth;
