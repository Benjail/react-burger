import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormFieldPassword } from "../../../copmonents/form-fields/password/password";
import styles from "./details.module.css";
import { useFormFieldText } from "../../../copmonents/form-fields/text/text";
import { useFormFieldEmail } from "../../../copmonents/form-fields/email/email";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { updateUser } from "../../../services/slices/profile-slice";

const initialPassword = "******";

export function ProfileDetailsPage() {
  const {
    request: { error, loading },
    user,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [changedForm, setChangedForm] = useState(false);
  const [valid, setValid] = useState(true);  

  const {
    field: nameField,
    valid: nameValid = true, 
    value: name,
    setValue: setName,
  } = useFormFieldText({
    placeholder: "Имя",
    name: "name",
    errorText: "Введите имя",
    isRequired: true,
    editable: true,
  });

  const {
    field: emailField,
    valid: emailValid = true,  
    value: email,
    setValue: setEmail,
  } = useFormFieldEmail({
    placeholder: "Логин",
    editable: true,
  });

  const {
    field: passwordField,
    valid: passwordValid = true,  
    value: password,
    setValue: setPassword,
  } = useFormFieldPassword({
    editable: true,
    initialValue: initialPassword,
  });

  const onSave = useCallback(() => {
    const newPassword = password === initialPassword ? {} : { password };
    dispatch(updateUser({ name, email, ...newPassword }));
  }, [name, email, password, dispatch]);

  const onCancel = useCallback(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(initialPassword);
  }, [user, setName, setEmail, setPassword]);

  // Инициализация значений при загрузке профиля
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setPassword(initialPassword);
  }, [setName, setEmail, setPassword, user]);

  // Проверка изменения формы
  useEffect(() => {
    setChangedForm(
      (user.name && name !== user.name) ||
      (user.email && email !== user.email) ||
      password !== initialPassword
    );
  }, [user, name, email, password]);

  // Валидация формы
  useEffect(() => {
    setValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <div className={styles.container}>
      {nameField}
      {emailField}
      {passwordField}
      {error && <p className={styles.error}>{error}</p>}
      {changedForm && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            disabled={loading}
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            disabled={loading || !valid}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
}
