import { memo } from 'react';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { SearchBar } from '@/features/SearchBooks';
import { LangSwitcher } from '@/features/LangSwitcher';
import cls from './Header.module.scss';

export const Header = memo(() => {
	return (
		<header className={cls.Header}>
			<div className={cls.controls}>
				<LangSwitcher />
				<ThemeSwitcher />
			</div>
			<SearchBar />
		</header>
	);
});
