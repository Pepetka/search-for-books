import { memo, ReactNode } from 'react';
import cls from './Page.module.scss';

interface IPageProps {
	children: ReactNode;
}

export const Page = memo((props: IPageProps) => {
	const { children } = props;

	return <main className={cls.Page}>{children}</main>;
});
