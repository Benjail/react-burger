import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../preloader/preloader";

const ProtectedRouteElement = ({  element, onlyUnAuth = false  }) => {
  const isAuthChecked = useSelector((state) => state.profile.isAuthChecked);
  const user = useSelector((state) => state.profile.user);
  const location = useLocation();
  
  console.log("isAuthChecked:", isAuthChecked);
  console.log("user:", user);
  console.log("location:", location);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;