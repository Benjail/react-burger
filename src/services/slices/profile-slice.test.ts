import { User } from '../../utils/types';
import profileSlice, { initialState, login, register, logout, getUser, updateUser, checkUserAuth } from './profile-slice';

const user: User = {
  email: 'testUser@test.ru',
  name: 'test_password',
};

describe('profileSlice', () => {
  it('should initialize correctly', () => {
    const state = profileSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('login', () => {
    it('should pending', () => {
      const action = { type: login.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should fulfilled', () => {
      const action = { type: login.fulfilled.type, payload: user };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, isAuthChecked: true, loading: false, error: false });
    });

    it('should rejected', () => {
      const action = { type: login.rejected.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true, loading: false});
    });
  });

  describe('register', () => {
    it('should pending', () => {
      const action = { type: register.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should fulfilled', () => {
      const action = { type: register.fulfilled.type, payload: user };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, isAuthChecked: true, loading: false, error: false });
    });

    it('should rejected', () => {
      const action = { type: register.rejected.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false });
    });
  });

  describe('logout', () => {
    it('should pending', () => {
      const action = { type: logout.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = profileSlice.reducer({ ...initialState, user }, action);
      expect(state).toEqual({ ...initialState, user: null, loading: false, error: false });
    });

    it('should rejected', () => {
      const action = { type: logout.rejected.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false });
    });
  });

  describe('getUser', () => {
    it('should pending', () => {
      const action = { type: getUser.pending.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should fulfilled', () => {
      const action = { type: getUser.fulfilled.type, payload: user };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, loading: false, error: false });
    });

    it('should rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true, loading: false, error: true });
    });
  });

  describe('checkUserAuth', () => {
    it('should fulfilled', () => {
      const action = { type: checkUserAuth.fulfilled.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true, error: false });
    });

    it('should rejected', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true, error: true });
    });
  });

  describe('updateUser', () => {
    it('should fulfilled', () => {
      const action = { type: updateUser.fulfilled.type, payload: { user } };
      const state = profileSlice.reducer(initialState, action);
      expect(state).toEqual({
        error: false,
        isAuthChecked: false,
        loading: false,
        user: user,
      });
    });
  });
});
