import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';

/**
 * Хук, возвращающий параметры поиска url в виде объекта
 * (при отсутствии параметров в url возвращает параметры из defaultSearchParams)
 * и устанавливающий defaultSearchParams в url
 * (при передаче withSet = true и при отсутствующих параметрах в url)
 * @param defaultSearchParams - объект параметров по-умолчанию
 * @param withSet - флаг, отвечающий за установку defaultSearchParams в url
 */
export const useGetSearchParams = <T extends Record<string, string>>(
	defaultSearchParams: T,
	withSet = false
) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const defaultSearchParamsEntries = useMemo(
		() => Object.entries(defaultSearchParams),
		[defaultSearchParams]
	);

	const searchParamsObject: T = useMemo(() => {
		return defaultSearchParamsEntries.reduce((acc, [key, value]) => {
			return { ...acc, [key]: searchParams.get(key) ?? value };
		}, {}) as T;
	}, [defaultSearchParamsEntries, searchParams]);

	const setSearchParamsHandle = useCallback(
		(searchParams = defaultSearchParams) => {
			setSearchParams(searchParams);
		},
		[defaultSearchParams, setSearchParams]
	);

	useEffect(() => {
		if (
			searchParams.get(defaultSearchParamsEntries[0][0]) === null &&
			withSet
		) {
			setSearchParamsHandle();
		}
	}, [
		defaultSearchParams,
		defaultSearchParamsEntries,
		searchParams,
		setSearchParamsHandle,
		setSearchParams,
		withSet,
	]);

	return [searchParamsObject, setSearchParamsHandle] as const;
};
