import { Meta, StoryObj } from '@storybook/react';
import { getThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
	title: 'features/ThemeSwitcher',
	component: ThemeSwitcher,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
	decorators: [getThemeDecorator()],
};

export const Light: Story = {
	decorators: [getThemeDecorator({ theme: Theme.LIGHT, invert: true })],
};
