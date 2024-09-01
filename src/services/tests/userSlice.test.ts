import { userSlice, UserState } from '../slices/userSlice';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk
} from '../slices/userSlice';
import { TAuthResponse, TRegisterData, TLoginData } from '../../utils/burger-api';

describe('userSlice tests', () => {
  const initialState: UserState = {
    isLoading: false,
    user: null,
    error: ''
  };

  const responseData: TAuthResponse = {
    success: true,
    refreshToken: 'fakeRefreshToken',
    accessToken: 'fakeAccessToken',
    user: { email: 'test@mail.com', name: 'test' }
  };

  const requestId = 'test-request-id';

  // Define appropriate arguments
  const registerArg: TRegisterData = {
    email: 'test@mail.com',
    name: 'test',
    password: 'password123'
  };

  const loginArg: TLoginData = {
    email: 'test@mail.com',
    password: 'password123'
  };

  it('pending getUserThunk test', () => {
    const state = userSlice.reducer(initialState, getUserThunk.pending(requestId));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('rejected getUserThunk test', () => {
    const state = userSlice.reducer(initialState, getUserThunk.rejected(new Error('Failed to get user'), requestId));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to get user');
  });

  it('fulfilled getUserThunk test', () => {
    const state = userSlice.reducer(
      initialState,
      getUserThunk.fulfilled(responseData, requestId)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(responseData.user);
  });

  it('pending registerUserThunk test', () => {
    const state = userSlice.reducer(initialState, registerUserThunk.pending(requestId, registerArg));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('rejected registerUserThunk test', () => {
    const state = userSlice.reducer(initialState, registerUserThunk.rejected(new Error('Registration failed'), requestId, registerArg));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Registration failed');
  });

  it('fulfilled registerUserThunk test', () => {
    const state = userSlice.reducer(
      initialState,
      registerUserThunk.fulfilled(responseData, requestId, registerArg)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(responseData.user);
  });

  it('pending loginUserThunk test', () => {
    const state = userSlice.reducer(initialState, loginUserThunk.pending(requestId, loginArg));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('rejected loginUserThunk test', () => {
    const state = userSlice.reducer(initialState, loginUserThunk.rejected(new Error('Login failed'), requestId, loginArg));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  it('fulfilled loginUserThunk test', () => {
    const state = userSlice.reducer(
      initialState,
      loginUserThunk.fulfilled(responseData, requestId, loginArg)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(responseData.user);
  });

  it('pending logoutUserThunk test', () => {
    const state = userSlice.reducer(initialState, logoutUserThunk.pending(requestId));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('rejected logoutUserThunk test', () => {
    const state = userSlice.reducer(initialState, logoutUserThunk.rejected(new Error('Logout failed'), requestId));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Logout failed');
  });

  it('fulfilled logoutUserThunk test', () => {
    const state = userSlice.reducer(
      initialState,
      logoutUserThunk.fulfilled({
          success: false
      }, requestId)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
  });
});
