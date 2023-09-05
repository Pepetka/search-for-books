import { memo } from 'react';
import { SearchBooks } from '@/features/SearchBooks';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { useGetSearchParams } from '@/shared/hooks/useGetSearchParams';
import cls from './MainPage.module.scss';

const MainPage = memo(() => {
	const [searchParamsObject] = useGetSearchParams(defaultSearchParams, true);

	return (
		<div className={cls.MainPage}>
			<SearchBooks searchParams={searchParamsObject} />
		</div>
	);
});

export default MainPage;
