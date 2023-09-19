import { forwardRef, HTMLAttributes, memo, ReactNode } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { classNames } from '@/shared/helpers/classNames/classNames';
import { Book } from '../../model/types/bookData';
import { BookCard } from '../BookCard/BookCard';
import cls from './BookList.module.scss';

interface IBookListProps {
	books: DeepRequired<Book>[];
	footer?: ReactNode;
	onEndReached?: () => void;
}

const ListContainer = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-testid="BookList"
			className={classNames([cls.BookList, className])}
			{...props}
		/>
	);
});

const overscan = {
	main: document.documentElement.clientHeight * 2,
	reverse: document.documentElement.clientHeight * 2,
};

export const BookList = memo((props: IBookListProps) => {
	const { books, footer, onEndReached } = props;

	return (
		<div className={cls.listWrapper}>
			<VirtuosoGrid
				useWindowScroll
				style={{ height: 'auto', width: '100%' }}
				data={books}
				overscan={overscan}
				components={{
					List: ListContainer,
					Footer: () => {
						if (footer) return <div className={cls.footer}>{footer}</div>;
					},
				}}
				endReached={onEndReached}
				computeItemKey={(index, book) => `${book.id}index:${index}`}
				itemContent={(_, book) => <BookCard bookData={book} />}
			/>
		</div>
	);
});
