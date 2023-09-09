import { Meta, StoryObj } from '@storybook/react';
import { getLangDecorator, getThemeDecorator } from '@/shared/config/storybook';
import { PageError } from './PageError';

const meta = {
	title: 'widgets/PageError',
	component: PageError,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getLangDecorator()],
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
