import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './forgot-password.module.css';
import { passwordReset } from '../../utils/api';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ email: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFormData.status) {
      passwordReset(formData.email).then((data) => navigate('/reset-password', { state: { message: data.message } }));
    } else {
      document.querySelector(`[name=${checkFormData.field}]`)?.closest('.input')?.classList.add('input_status_error');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name='email' isIcon={false} placeholder='Укажите e-mail' />
        <Button htmlType='submit' type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
