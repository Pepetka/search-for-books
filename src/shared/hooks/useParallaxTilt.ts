import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import cls from './styles/useParralaxTilt.module.scss';

export const useParallaxTilt = (withMax = false) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);

	const onMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (!cardRef.current) return;
			const size = cardRef.current.getBoundingClientRect();
			const dx = event.clientX - size.x - size.width / 2;
			const dy = -1 * (event.clientY - size.y - size.height / 2);
			const dxPercent = dx / size.width;
			const dyPercent = dy / size.height;
			let maxDegX = 0;
			let maxDegY = 0;

			if (withMax) {
				maxDegX =
					(Math.atan(
						Math.sqrt(2 * (size.height / 2) * 20 + Math.pow(20, 2)) /
							(size.height / 2)
					) *
						180) /
					Math.PI;
				maxDegY =
					(Math.atan(
						Math.sqrt(2 * (size.width / 2) * 20 + Math.pow(20, 2)) /
							(size.width / 2)
					) *
						180) /
					Math.PI;
			}

			const rxCondition = withMax && Math.abs(dyPercent * 20) > maxDegX;
			const ryCondition = withMax && Math.abs(dxPercent * 20) > maxDegY;

			cardRef.current?.style.setProperty(
				'--rx',
				`${rxCondition ? maxDegX : dyPercent * 20}deg`
			);
			cardRef.current?.style.setProperty(
				'--ry',
				`${ryCondition ? maxDegY : dxPercent * 20}deg`
			);
		},
		[withMax]
	);

	const onMouseLeave = useCallback(() => {
		timerRef.current = setTimeout(() => {
			if (!cardRef.current) return;

			cardRef.current.style.setProperty('--rx', '0deg');
			cardRef.current.style.setProperty('--ry', '0deg');
		}, 500);
	}, []);

	useEffect(
		() => () => {
			if (!timerRef.current) return;
			clearTimeout(timerRef.current);
		},
		[]
	);

	return {
		parallaxClasses: cls,
		cardRef,
		onMouseMove,
		onMouseLeave,
	};
};
