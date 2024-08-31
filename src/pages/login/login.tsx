import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk, selectError } from '../../services/slices/userSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    dispatch(loginUserThunk(userData))
      .unwrap()
      .then((dataResponse) => {
        setCookie('accessToken', dataResponse.accessToken);
        localStorage.setItem('refreshToken', dataResponse.refreshToken);
      });
  };

  const errorMessage = useSelector(selectError);

  return (
    <LoginUI
      errorText={errorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
