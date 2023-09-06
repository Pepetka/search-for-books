import { memo } from 'react';
import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
	return (
		<div className={cls.NoteFoundPage}>
			<h1>Page not found</h1>
		</div>
	);
});

export default NotFoundPage;
