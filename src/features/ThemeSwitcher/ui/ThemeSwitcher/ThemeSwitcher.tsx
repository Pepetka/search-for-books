import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import cls from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = memo(() => {
	const { theme, changeTheme } = useTheme();
	const { t } = useTranslation();

	const onChangeTheme = () => {
		changeTheme();
	};

	return (
		<div data-testid="ThemeSwitcher" className={cls.ThemeSwitcher}>
			<button
				data-testid="ThemeSwitcher.button"
				aria-label="Switch theme"
				onClick={onChangeTheme}
			>
				{theme === Theme.DARK ? t('Dark') : t('Light')}
			</button>
		</div>
	);
});
