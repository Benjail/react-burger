import { AppHeader } from './app-header/app-header';
import styles from './app.module.css';
import { useSelector, useDispatch } from "../services/hooks/hooks";
import { useEffect} from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import BurgerIngredientModal from "../pages/burger-ingredient/burger-ingredient-modal";
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { NotFoundPage } from "../pages/not-found/not-found";
import{ LogoutPage } from "../pages/profile/logout/details";
import { ProfileOrdersPage } from "../pages/profile/orders/orders";
import { ProfilePage } from "../pages/profile/profile";
import { RegisterPage } from "../pages/register/register";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import ErrorBoundary from "./error-boundary/error-boundary";
import  ProtectedRouteElement  from "./protected/protected-route-element";
import { checkUserAuth } from '../services/slices/profile-slice';
import { getIngredients } from '../services/slices/ingredients-slice';
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  INGREDIENT_ROUTE,
  LOGIN_ROUTE,
  PROFILE_LOGOUT_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../const/routes";
import BurgerIngredientPage from "../pages/burger-ingredient/burger-ingredient-page";

export const App = (): React.JSX.Element => {
  const overlayError = useSelector((state:any) => state.error?.overlayError || null);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary error={overlayError}>
      <div className={styles.wrapper}>
        <AppHeader />
        <Routes location={location.state?.backgroundLocation || location}>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={LOGIN_ROUTE} element={<ProtectedRouteElement onlyUnAuth={true} element={<LoginPage />} />} />
          <Route path={REGISTER_ROUTE} element={ <ProtectedRouteElement onlyUnAuth={true} element={<RegisterPage />} />} />       
          <Route path={FORGOT_PASSWORD_ROUTE} element={ <ProtectedRouteElement onlyUnAuth={true} element={<ForgotPasswordPage />}  /> }/>
          <Route path={RESET_PASSWORD_ROUTE} element={ <ProtectedRouteElement onlyUnAuth={true} element={<ResetPasswordPage />}/> } />
          <Route path={PROFILE_ROUTE} element={<ProtectedRouteElement onlyUnAuth = {false} element={<ProfilePage />} />}>
            <Route path= {PROFILE_ORDERS_ROUTE} element={<ProfileOrdersPage />} /> 
            <Route path={PROFILE_LOGOUT_ROUTE} element={<LogoutPage />} /> 
          </Route>

          {!location.state?.backgroundLocation && (
            <Route
              path={INGREDIENT_ROUTE + "/:productId"}
              element={<BurgerIngredientPage />}
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path={INGREDIENT_ROUTE + "/:productId"}
              element={<BurgerIngredientModal />}
            />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
}