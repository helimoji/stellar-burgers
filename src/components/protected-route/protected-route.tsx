import { selectIsLoading, selectUser } from '../../services/slices/userSlice';

import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean; //компонент доступен только неавторизованному пользователю
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const location = useLocation();

  // пока идет загрузка отображаем прелоадер
  if (isAuthChecked) {
    return <Preloader />;
  }

  // текущий маршрут предназначен для авторизованных пользователей, а пользователь не авторизован.
  // В этом случае выполняется редирект на страницу логина (/login)
  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // текущий маршрут предназначен для неавторизованных пользователей (например, страница логина или регистрации),
  // но пользователь уже авторизован. В этом случае выполняется редирект на предыдущую страницу (если она указана)
  // или на главную страницу (/).
  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
