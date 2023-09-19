import { Decorator } from '@storybook/react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ReactNode, useEffect } from 'react';
import i18nextTest from '@/shared/config/i18next/i18nextTest';
import { Lang } from '@/shared/const/lang';

const LangSetter = ({
	children,
	lang,
}: {
	children: ReactNode;
	lang: Lang;
}) => {
	const { i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [i18n, lang]);

	return children;
};

export const getLangDecorator =
	(lang: Lang = Lang.EN): Decorator =>
	(StoryComponent) => {
		return (
			<I18nextProvider i18n={i18nextTest}>
				<LangSetter lang={lang}>
					<StoryComponent />
				</LangSetter>
			</I18nextProvider>
		);
	};
