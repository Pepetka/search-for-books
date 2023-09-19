import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface IThemeProviderProps {
	children: ReactNode;
	initialTheme?: Theme;
}

const localTheme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null) ??
	(window.matchMedia('(prefers-color-scheme: dark)').matches
		? Theme.DARK
		: Theme.LIGHT);

export const ThemeProvider = ({
	children,
	initialTheme,
}: IThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(initialTheme ?? localTheme);

	const themeValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	);

	useEffect(() => {
		const themeRoot = document.querySelector('[data-themeroot]') as HTMLElement;

		if (themeRoot) {
			themeRoot.classList.remove(Theme.DARK);
			themeRoot.classList.remove(Theme.LIGHT);
			themeRoot.classList.add(theme);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
	);
};
