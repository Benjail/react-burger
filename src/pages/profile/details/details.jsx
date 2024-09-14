import {
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormFieldPassword } from "../../../copmonents/form-fields/password/password";
import styles from "./details.module.css";
import { useFormFieldText } from "../../../copmonents/form-fields/text/text";
import { useFormFieldEmail } from "../../../copmonents/form-fields/email/email";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { updateProfile } from "../../../services/slices/profile";

const initialPassword = "******";

export function ProfileDetailsPage() {
  const {
    request: { error, loading },
    ...profile
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [changedForm, setChangedForm] = useState();
  const [valid, setValid] = useState();

  const {
    field: nameField,
    valid: nameValid,
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
    valid: emailValid,
    value: email,
    setValue: setEmail,
  } = useFormFieldEmail({
    placeholder: "Логин",
    editable: true,
  });
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
    setValue: setPassword,
  } = useFormFieldPassword({
    editable: true,
    initialValue: initialPassword,
  });

  const onSave = useCallback(() => {
    const newPassword = password === initialPassword ? {} : { password };

    dispatch(updateProfile({ name, email, ...newPassword }));
  }, [name, email, password]);
  const onCancel = useCallback(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPassword(initialPassword);
  }, [profile, name, email, password]);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPassword(initialPassword);
  }, [profile.name, profile.email]);

  useEffect(() => {
    setChangedForm(
      name !== profile.name ||
        email !== profile.email ||
        password !== initialPassword
    );
  }, [profile, name, email, password]);

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
