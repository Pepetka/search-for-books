import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/Store/types/dispatch';

/**
 * Типизированный dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
