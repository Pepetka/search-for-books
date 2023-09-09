import { ImgHTMLAttributes, memo, useLayoutEffect, useState } from 'react';
import fallbackImg from '@/shared/assets/img/fallback.jpg';
import { Loader, LoaderTheme } from '@/shared/ui/Loader';
import { classNames } from '@/shared/helpers/classNames/classNames';
import cls from './AppImage.module.scss';

interface IImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	theme?: LoaderTheme;
}

export const AppImage = memo((props: IImageProps) => {
	const {
		theme,
		src,
		alt = '',
		className,
		width,
		height,
		...otherProps
	} = props;
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsError(false);
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsError(true);
			setIsLoading(false);
		};
	}, [src]);

	if (isError) {
		return (
			<div
				data-testid="AppImage.error"
				className={classNames([cls.AppImage, className])}
				style={{ width, height }}
			>
				<img src={fallbackImg} {...otherProps} alt={alt} />
			</div>
		);
	}

	if (isLoading) {
		return (
			<div
				data-testid="AppImage.loading"
				className={classNames([cls.AppImage, className])}
				style={{ width, height }}
			>
				<div className={cls.loader}>
					<Loader theme={theme} />
				</div>
			</div>
		);
	}

	return (
		<div
			data-testid="AppImage"
			className={classNames([cls.AppImage, className])}
			style={{ width, height }}
		>
			<img src={src} {...otherProps} alt={alt} />
		</div>
	);
});
