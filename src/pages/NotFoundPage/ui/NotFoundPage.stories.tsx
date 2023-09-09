import { Meta, StoryObj } from '@storybook/react';
import { getLangDecorator, getThemeDecorator } from '@/shared/config/storybook';
import NotFoundPage from './NotFoundPage';

const meta = {
	title: 'pages/NotFoundPage',
	component: NotFoundPage,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getLangDecorator()],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
