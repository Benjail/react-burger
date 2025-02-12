import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './reset-password.module.css';
import { confirmReset } from '../../utils/api';

export const ResetPasswordPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ password: '', token: '' });
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message !== 'Reset email sent') {
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!checkFormData.status) {
      setError(`Поле "${checkFormData.field === 'password' ? 'Пароль' : 'Код'}" заполнено неверно.`);
      return;
    }

    try {
      await confirmReset(formData.password, formData.token);
     navigate('/login', { replace: true });
    } catch (err) {
      if (err instanceof Error)
        setError('Не удалось восстановить пароль. Проверьте введённые данные.');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <input hidden autoComplete="username" name="username" />
        <PasswordInput
          onChange={onChangeFormData}
          value={formData.password}
          autoComplete="new-password"
          name="password"
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onChangeFormData}
          value={formData.token}
          name="token"
          placeholder="Введите код из письма" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        {error && <p className="input__error text_type_main-default">{error}</p>}
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </span>
    </main>
  );
};
