// declare module '*.svg' {
// 	import type * as React from 'react';

// 	const ReactComponent: React.FunctionComponent<
// 		React.SVGProps<SVGSVGElement> & { title?: string }
// 	>;

// 	export default ReactComponent;
// }

declare module '*.svg?react' {
	import type * as React from 'react';

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	export default ReactComponent;
}

declare module '*.svg' {
	import type * as React from 'react';

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	export default ReactComponent;
}

/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
