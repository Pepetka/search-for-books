/// <reference types="vite/client" />
declare module '*.svg' {
	import React from 'react';

	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.jpg';

declare const __API__: string;
declare const __API_KEY__: string;
