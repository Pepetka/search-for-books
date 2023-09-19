import type { Meta, StoryObj } from '@storybook/react';
import { getThemeDecorator } from '@/shared/config/storybook';
import { Loader } from './Loader';

const meta = {
	title: 'shared/Loader',
	component: Loader,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		theme: 'normal',
	},
	decorators: [getThemeDecorator({ invert: true })],
};

export const Invert: Story = {
	args: {
		theme: 'invert',
	},
	decorators: [getThemeDecorator()],
};
