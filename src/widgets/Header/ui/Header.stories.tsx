import { Meta, StoryObj } from '@storybook/react';
import {
	getLangDecorator,
	getRouterDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { Header } from './Header';

const meta = {
	title: 'widgets/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getLangDecorator(), getRouterDecorator()],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
