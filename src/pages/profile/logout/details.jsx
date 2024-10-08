import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/slices/profile";
import { useNavigate } from "react-router-dom";
import styles from "./details.module.css";
import { LOGIN_ROUTE } from "../../../const/routes";

export function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogout = useSelector((state) => !state.profile.name);
  const error = useSelector((state) => state.profile.request.error);
  const loading = useSelector((state) => state.profile.request.loading);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLogout]);

  return loading ? "Выход..." : <p className={styles.error}>{error}</p>;
}
