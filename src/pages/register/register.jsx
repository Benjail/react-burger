import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormFieldEmail } from "../../copmonents/form-fields/email/email";
import { useFormFieldPassword } from "../../copmonents/form-fields/password/password";
import { useFormFieldText } from "../../copmonents/form-fields/text/text";
import styles from "./register.module.css";
import { register } from "../../services/slices/profile";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../const/routes";

export function RegisterPage() {
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRegister = useSelector((state) => !!state.profile?.name);
  const error = useSelector((state) => state.profile?.request.error);
  const loading = useSelector((state) => state.profile?.request.loading);

  const {
    field: nameField,
    valid: nameValid,
    value: name,
  } = useFormFieldText({
    placeholder: "Имя",
    name: "name",
    errorText: "Введите имя",
    isRequired: true,
  });
  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail();
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(register({ password, email, name }));
    },
    [dispatch, password, email, name]
  );

  useEffect(() => {
    if (isRegister) {
      navigate(HOME_ROUTE, { replace: true });
    }
  }, [isRegister]);

  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      {nameField}
      {emailField}
      {passwordField}
      {error && <p className={styles.error}>{error}</p>}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid || loading}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>
          <Link to={LOGIN_ROUTE} className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
}
