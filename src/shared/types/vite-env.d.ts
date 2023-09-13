/// <reference types="vite/client" />
declare module '*.svg' {
	import React from 'react';

	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.webp';

type DeepPartial<T> = T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

type DeepRequired<T> = {
	[P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

declare const __API__: string;
declare const __API_KEY__: string;
