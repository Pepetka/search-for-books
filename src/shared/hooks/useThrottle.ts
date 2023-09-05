import { useCallback, useEffect, useRef } from 'react';

export const useThrottle = <T>(
	callback: (args: T) => void,
	timeout: number = 1000
) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const withThrottle = useCallback(
		(args: T) => {
			if (timerRef.current) {
				return;
			}

			callback(args);
			timerRef.current = setTimeout(() => {
				if (timerRef.current) clearTimeout(timerRef.current);
				timerRef.current = null;
			}, timeout);
		},
		[callback, timeout]
	);

	useEffect(() => {
		const timer = timerRef.current;

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	return withThrottle;
};
