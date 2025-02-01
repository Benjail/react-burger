import { Link, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../services/slices/profile-slice';
import { FormEvent, useState } from 'react';

export const LoginPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ email: '', password: '' });
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 

    if (!checkFormData.status) {
      setError(`Поле "${checkFormData.field === 'password'? "Пароль":"Email"}" заполнено неверно.`);
      return;
    }

    try {
      // @ts-ignore
      await dispatch(login(formData)).unwrap();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name="email" isIcon={false} />
        <PasswordInput onChange={onChangeFormData} value={formData.password} name="password" />
        {error && <p className="input__error text_type_main-default">{error}</p>}
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to="/register" state={{ from: location.state?.from }}>Зарегистрироваться</Link>
      </span>
      <span className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </span>
    </main>
  );
};
