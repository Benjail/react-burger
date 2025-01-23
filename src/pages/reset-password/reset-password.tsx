import { FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './reset-password.module.css';
import { confirmReset } from '../../utils/api';

export const ResetPasswordPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ password: '', token: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message !== 'Reset email sent') {
      navigate('/forgot-password', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isError = document.querySelector('.input__error');
    if (isError) return;

    if (checkFormData.status) {
      confirmReset(formData.password, formData.token)
        .then((data) => data.success && navigate('/login', { replace: true }))
        .catch((err) => {
          const error = Object.assign(document.createElement('p'), { className: 'input__error text_type_main-default', textContent: err.message });
          const input = document.querySelector('[name="token"]')?.closest('.input');
          input?.classList.add('input_status_error');
          input?.closest('.input__container')?.append(error);
          setTimeout(() => {
            input?.classList.remove('input_status_error');
            error.remove();
          }, 2000);
        });
    } else {
      document.querySelector(`[name=${checkFormData.field}]`)?.closest('.input')?.classList.add('input_status_error');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <input hidden autoComplete='username' name='username' />
        <PasswordInput onChange={onChangeFormData} value={formData.password} autoComplete='new-password' name='password' placeholder='Введите новый пароль' />
        <Input onChange={onChangeFormData} value={formData.token} name='token' placeholder='Введите код из письма' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        <Button htmlType='submit' type='primary' size='medium'>
          Сохранить
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
