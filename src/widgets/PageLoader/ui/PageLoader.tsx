import { memo } from 'react';
import { Loader, LoaderTheme } from '@/shared/ui/Loader';
import cls from './PageLoader.module.scss';

interface IPageLoaderProps {
	theme?: LoaderTheme;
}

export const PageLoader = memo((props: IPageLoaderProps) => {
	const { theme } = props;

	return (
		<div className={cls.PageLoader}>
			<Loader theme={theme} />
		</div>
	);
});
