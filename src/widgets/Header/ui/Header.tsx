import { memo } from 'react';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwither';
import { SearchBar } from '@/features/SearchBooks';
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
