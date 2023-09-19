import { Meta, StoryObj } from '@storybook/react';
import {
	getRouterDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { SearchBar } from './SearchBar';

const meta = {
	title: 'features/SearchBooks/SearchBar',
	component: SearchBar,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getRouterDecorator(), getThemeDecorator()],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {},
	parameters: {},
	decorators: [],
};
