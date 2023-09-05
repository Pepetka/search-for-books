import { memo, ReactNode, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useThrottle } from '@/shared/hooks/useThrottle';
import { getScroll } from '../model/selectors/getScroll/getScrollSaveScrollByPath';
import { scrollActions } from '../model/slice/scrollSclice';
import cls from './Page.module.scss';

interface IPageProps {
	children: ReactNode;
}

export const Page = memo((props: IPageProps) => {
	const { children } = props;
	const dispatch = useAppDispatch();
	const location = useLocation();
	const scroll = useSelector(getScroll(location.pathname + location.search));

	const onScrollCallback = useCallback(() => {
		dispatch(
			scrollActions.setScroll({
				path: location.pathname + location.search,
				position: window.scrollY,
			})
		);
	}, [dispatch, location.pathname, location.search]);

	const onScroll = useThrottle(onScrollCallback, 100);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);

	useEffect(() => {
		window.scrollTo(0, scroll);
		// eslint-disable-next-line
	}, [location.pathname, location.search]);

	return <main className={cls.Page}>{children}</main>;
});
