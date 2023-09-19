import { Meta, StoryObj } from '@storybook/react';
import { getLangDecorator, getThemeDecorator } from '@/shared/config/storybook';
import { Lang } from '@/shared/const/lang';
import { LangSwitcher } from './LangSwitcher';

const meta = {
	title: 'features/LangSwitcher',
	component: LangSwitcher,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator()],
} satisfies Meta<typeof LangSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const En: Story = {
	parameters: {},
	decorators: [getLangDecorator(Lang.EN)],
};

export const Ru: Story = {
	parameters: {},
	decorators: [getLangDecorator(Lang.RU)],
};
