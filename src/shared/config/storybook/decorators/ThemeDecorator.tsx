import { Decorator } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/Themes';
import '@/app/styles/index.scss';
import { Theme } from '@/shared/const/theme';

export const getThemeDecorator =
	({
		theme = Theme.DARK,
		invert,
	}: {
		theme?: Theme;
		invert?: boolean;
	} = {}): Decorator =>
	(StoryComponent) => {
		return (
			<div
				data-themeroot=""
				style={{
					width: '100%',
					minHeight: '100vh',
					backgroundColor: 'var(--bg-color)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ThemeProvider initialTheme={theme}>
					<div
						style={{
							width: '100%',
							minHeight: '100vh',
							backgroundColor: invert
								? 'var(--invert-bg-color)'
								: 'var(--bg-color)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						className={theme}
					>
						<StoryComponent />
					</div>
				</ThemeProvider>
			</div>
		);
	};
