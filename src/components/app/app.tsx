import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ingredientsThunk } from '../../services/slices/ingregientsSlice';
import { getUserThunk } from '../../services/slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleModalClose = () => navigate(-1);
  const handleCloseAndGoHome = () => navigate('/');

  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(ingredientsThunk());
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={handleCloseAndGoHome}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/feed/:number'
          element={
            <Modal title={'Информация о заказе'} onClose={handleCloseAndGoHome}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                title={'Информация о заказе'}
                onClose={handleCloseAndGoHome}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Маршруты для модальных окон */}
      {background && (
        <>
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title={'Информация о заказе'} onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={'Информация о заказе'}
                    onClose={handleModalClose}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
