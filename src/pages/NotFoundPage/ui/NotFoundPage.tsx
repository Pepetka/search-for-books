import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
	const { t } = useTranslation();

	return (
		<div className={cls.NoteFoundPage}>
			<h1>{t('Page not found')}</h1>
		</div>
	);
});

export default NotFoundPage;
