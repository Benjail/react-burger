import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from '../../services/slices/profile-slice';
import useFormData from '../../copmonents/hooks/use-form-data';
import styles from './profile.module.css';
import { User } from '../../utils/types';

export const ProfilePage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.profile);
  const [disabled, setDisabled] = useState(true);
  const { formData, onChangeFormData, setFormData, checkFormData } = useFormData({ ...user, password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isShowButtons, setShowButtons] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch(logout()).then(() => navigate('/login'));
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef?.current?.focus(), 0);
  };

  const handleBlur = () => {
    setDisabled(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!checkFormData.status) {
      setError(`Поле "${checkFormData.field === 'name' ? 'Имя' : checkFormData.field === 'email' ? 'Email': 'Пароль' }" заполнено неверно.`);
      return;
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      setFormData({ ...formData, password: '' });
      setShowButtons(false);
    } catch (err) {
      if (err instanceof Error)
        setError(err.message || 'Произошла ошибка');
    }
  };

  const handleCancelClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setFormData({ ...user, password: '' });
    setShowButtons(false);
    setError(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeFormData(e);
    if (user && e.target.value !== (user[e.target.name as keyof User] || '')) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  };

  return (
    <main className={styles.main}>
      <menu className={styles.menu}>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink to='' className={({ isActive }) => (isActive ? styles.link : `${styles.link} ${styles.inactive}`)} end>
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink to='orders' className={({ isActive }) => (isActive ? styles.link : `${styles.link} ${styles.inactive}`)} end>
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <span className={`${styles.link} ${styles.inactive}`} onClick={handleLogout}>
            Выход
          </span>
        </li>
        <span className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </menu>
      {location.pathname === '/profile' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            onChange={(e) => handleChange(e)}
            value={formData.name}
            type='text'
            name='name'
            placeholder='Имя'
            icon='EditIcon'
            ref={inputRef}
            onIconClick={handleIconClick}
            onBlur={handleBlur}
            disabled={disabled} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          <EmailInput
            onChange={(e) => handleChange(e)}
            value={formData.email}
            name='email'
            autoComplete='username'
            isIcon={true}
          />
          <PasswordInput
            onChange={(e) => handleChange(e)}
            value={formData.password}
            name='password'
            autoComplete='new-password'
            icon='EditIcon'
          />
          {error && <p className="input__error text_type_main-default">{error}</p>}
          {isShowButtons && (
            <div className={styles.buttons}>
              <span className={`${styles.cancel} ${styles.link} ${styles.inactive} mr-4`} onClick={handleCancelClick}>
                Отменить
              </span>
              <Button extraClass={styles.save} htmlType='submit'>
                Сохранить
              </Button>
            </div>
          )}
        </form>
      ) : (
        <Outlet />
      )}
    </main>
  );
};
