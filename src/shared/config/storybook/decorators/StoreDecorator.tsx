import { Decorator } from '@storybook/react';
import { StoreProvider } from '@/app/providers/Store/ui/StoreProvider';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';

export const getStoreDecorator =
	(initialState: DeepPartial<StateSchema> = {}): Decorator =>
	(StoryComponent) => {
		return (
			<StoreProvider initialState={initialState as StateSchema}>
				<StoryComponent />
			</StoreProvider>
		);
	};
