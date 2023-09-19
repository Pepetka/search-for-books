import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { getThemeDecorator } from '@/shared/config/storybook';
import testImg from '@/shared/assets/img/test.webp';
import { AppImage } from './AppImage';

const meta = {
	title: 'shared/AppImage',
	component: AppImage,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator()],
	args: {
		width: '300px',
		height: '300px',
	},
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	decorators: [getThemeDecorator()],
};
Normal.args = {
	theme: 'normal',
	src: `${__API__}/fulfilled.webp`,
};
Normal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/fulfilled.webp`, async (_, res, ctx) => {
				const imageBuffer = await fetch(testImg).then((res) =>
					res.arrayBuffer()
				);

				return res(
					ctx.set('Content-Length', imageBuffer.byteLength.toString()),
					ctx.set('Content-Type', 'image/jpeg'),
					ctx.body(imageBuffer)
				);
			}),
		],
	},
};

export const Error: Story = {
	decorators: [getThemeDecorator()],
};
Error.args = {
	theme: 'normal',
	src: `${__API__}/error.webp`,
};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/error.webp`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const NormalLoading: Story = {
	decorators: [getThemeDecorator({ invert: true })],
};
NormalLoading.args = {
	src: `${__API__}/loading.webp`,
	theme: 'normal',
};
NormalLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/loading.webp`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const InvertLoading: Story = {
	decorators: [getThemeDecorator()],
};
InvertLoading.args = {
	src: `${__API__}/loading.webp`,
	theme: 'invert',
};
InvertLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/loading.webp`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};
