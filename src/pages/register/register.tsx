import { FormEvent,useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './register.module.css';
import { register } from '../../services/slices/profile-slice';

export const RegisterPage = (): React.JSX.Element => {
  const { formData, onChangeFormData, checkFormData } = useFormData({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (checkFormData.status) {
      try {
        //@ts-ignore
        dispatch(register(formData)).unwrap();
        navigate(location.state?.from ?? '/', { replace: true });
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка');
      }
    } else {
      setError(`Поле "${checkFormData.field === 'password' ? 'Пароль' : checkFormData.field === 'email' ? 'Email' : 'Имя'}" заполнено неверно.`);
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <Input onChange={onChangeFormData} value={formData.name} name='name' type='text' placeholder='Имя' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        <EmailInput onChange={onChangeFormData} value={formData.email} autoComplete='username' name='email' isIcon={false} />
        <PasswordInput onChange={onChangeFormData} value={formData.password} autoComplete='new-password' name='password' />
        {error && <p className='input__error text_type_main-default'>{error}</p>}
        <Button htmlType='submit' type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
