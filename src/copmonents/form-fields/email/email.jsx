import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_DEFAULT = "E-mail";
const ERROR_DEFAULT = "Некорректный email";
const NAME_DEFAULT = "email";

export function useFormFieldEmail({
  errorText,
  name,
  initialValue,
  placeholder,
  editable,
  icon,
} = {}) {
  name = name ?? NAME_DEFAULT;
  errorText = errorText ?? ERROR_DEFAULT;
  placeholder = placeholder ?? PLACEHOLDER_DEFAULT;
  initialValue = initialValue ?? "";
  icon = icon ?? (editable ? "EditIcon" : undefined);
  editable = editable ?? icon === "EditIcon";

  const [email, setEmail] = useState(initialValue);
  const [emailError, setEmailError] = useState(errorText);
  const [valid, setValid] = useState();
  const emailTyped = useRef(false);
  const emailRef = useRef();
  const [isEdit, setIsEdit] = useState(!editable);

  const onEmailBlur = () => {
    setEmailError(valid ? "" : errorText);

    if (editable) {
      setIsEdit(false);
    }
  };

  const onEmailFocus = () => {
    setEmailError("");
  };

  const onIconClick = (e) => {
    if (editable) {
      setIsEdit(true);
    }

    setTimeout(() => emailRef.current.focus(), 0);
  };

  useEffect(() => {
    if (email && !emailTyped.current) {
      emailTyped.current = true;
    }

    setValid(email && emailRef.current.checkValidity());
  }, [email]);

  return {
    field: (
      <Input
        ref={emailRef}
        placeholder={placeholder}
        type="email"
        value={email}
        name={name}
        disabled={!isEdit}
        noValidate={true}
        onChange={(e) => setEmail(e.target.value)}
        icon={icon}
        onBlur={onEmailBlur}
        onFocus={onEmailFocus}
        onIconClick={onIconClick}
        error={!valid && !!emailError && emailTyped.current}
        errorText={emailError}
      />
    ),
    value: email,
    valid,
    setValue: setEmail,
  };
}
