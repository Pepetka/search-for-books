import { Meta, StoryObj } from '@storybook/react';
import { getLangDecorator, getThemeDecorator } from '@/shared/config/storybook';
import { PageLoader } from './PageLoader';

const meta = {
	title: 'widgets/PageLoader',
	component: PageLoader,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getLangDecorator()],
} satisfies Meta<typeof PageLoader>;

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
	decorators: [getThemeDecorator({ invert: false })],
};
