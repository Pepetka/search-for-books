import { Component, ErrorInfo, ReactNode } from 'react';

interface IErrorBoundaryProps {
	children: ReactNode;
}

interface IErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<
	IErrorBoundaryProps,
	IErrorBoundaryState
> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): IErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.log(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Error</h1>;
		}

		return this.props.children;
	}
}
