import { Link, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../services/slices/profile-slice';
import { FormEvent } from 'react';

export const LoginPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ email: '', password: '' });
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isError = (e.target as HTMLFormElement).querySelector('.input__error');
    if (isError) return;

    if (checkFormData.status) {
      // @ts-ignore - убрать @ts-ignore, если типизация `dispatch` исправлена
      dispatch(login(formData))
        .unwrap()
        .catch((err: Error) => {
          const error = Object.assign(document.createElement('p'), {
            className: 'input__error text_type_main-default',
            textContent: err.message,
          });
          const input = (e.target as HTMLFormElement).querySelector('[name="password"]')?.closest('.input') as HTMLElement;

          input.closest('.input__container')?.append(error);
          setTimeout(() => {
            error.remove();
          }, 2000);
        });
    } else {
      (e.target as HTMLFormElement)
        .querySelector(`[name=${checkFormData.field}]`)
        ?.closest('.input')
        ?.classList.add('input_status_error');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name="email" isIcon={false} />
        <PasswordInput onChange={onChangeFormData} value={formData.password} name="password" />
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
}
