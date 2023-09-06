import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';

export const PageError = memo(() => {
	const { t } = useTranslation();

	return (
		<div className={cls.PageError}>
			<h1>{t('Something went wrong')}</h1>
			<button onClick={() => window.location.reload()}>
				{t('Reload page')}
			</button>
		</div>
	);
});
