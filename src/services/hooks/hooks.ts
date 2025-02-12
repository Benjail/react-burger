import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../slices/index';

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()