import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/slices/profile-slice";
import { useNavigate } from "react-router-dom";
import styles from "./details.module.css";
import { LOGIN_ROUTE } from "../../../const/routes";

export const LogoutPage = (): React.JSX.Element => {
  const dispatch:any = useDispatch();
  const navigate = useNavigate();

  const isLogout = useSelector((state: any) => !state.profile.name);
  const error = useSelector((state: any) => state.profile.request.error);
  const loading = useSelector((state: any) => state.profile.request.loading);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLogout, navigate]);

  return <div>
      {loading ? "Выход..." : error ? <p className={styles.error}>{error}</p> : null};
  </div>
}
