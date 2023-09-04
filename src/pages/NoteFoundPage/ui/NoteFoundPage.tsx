import { memo } from 'react';
import cls from './NoteFoundPage.module.scss';

const NoteFoundPage = memo(() => {
	return (
		<div className={cls.NoteFoundPage}>
			<h1>Page not found</h1>
		</div>
	);
});

export default NoteFoundPage;
