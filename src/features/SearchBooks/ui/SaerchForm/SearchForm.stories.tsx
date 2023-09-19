import { Meta, StoryObj } from '@storybook/react';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { getLangDecorator, getThemeDecorator } from '@/shared/config/storybook';
import { Lang } from '@/shared/const/lang';
import { SearchForm } from './SearchForm';

const meta = {
	title: 'features/SearchBooks/SearchForm',
	component: SearchForm,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getLangDecorator(Lang.EN)],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		initialSearchParams: defaultSearchParams,
	},
	decorators: [],
};
