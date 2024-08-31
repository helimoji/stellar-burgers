import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  feedThunk,
  selectIsLoading,
  selectOrders
} from '../../services/slices/feedSlice';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  function handleGetAllFeeds() {
    dispatch(feedThunk());
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllFeeds();
      }}
    />
  );
};
