import { memo } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import cls from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = memo(() => {
	const { theme, changeTheme } = useTheme();

	return (
		<div className={cls.ThemeSwitcher}>
			<button onClick={() => changeTheme()}>
				{theme === Theme.DARK ? 'Dark' : 'Light'}
			</button>
		</div>
	);
});
