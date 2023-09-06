import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Lang } from '@/shared/const/lang';
import cls from './LangSwitcher.module.scss';

export const LangSwitcher = memo(() => {
	const { i18n } = useTranslation();

	const onChangeLang = async () => {
		await i18n.changeLanguage(i18n.language === Lang.RU ? Lang.EN : Lang.RU);
	};

	return (
		<div data-testid="LangSwitcher" className={cls.LangSwitcher}>
			<button data-testid="LangSwitcher.button" onClick={onChangeLang}>
				{i18n.language === Lang.RU ? 'Ru' : 'En'}
			</button>
		</div>
	);
});
