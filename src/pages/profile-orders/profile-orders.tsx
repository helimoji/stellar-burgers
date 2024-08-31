import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getUserOrdersThunk,
  selectError,
  selectIsLoading,
  selectOrders
} from '../../services/slices/userOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectOrders);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return `${error}`;
  }

  return <ProfileOrdersUI orders={orders} />;
};
