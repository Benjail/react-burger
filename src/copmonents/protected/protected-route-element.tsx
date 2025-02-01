import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../preloader/preloader";

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
}

const ProtectedRouteElement= ({ element, onlyUnAuth = false }: Props) : React.JSX.Element  => {
  const isAuthChecked = useSelector((state:any) => state.profile.isAuthChecked);
  const user = useSelector((state: any) => state.profile.user);
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