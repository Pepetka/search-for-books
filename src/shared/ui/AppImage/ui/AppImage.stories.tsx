import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { getThemeDecorator } from '@/shared/config/storybook';
import testImg from '@/shared/assets/img/test.jpg';
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
	src: `${__API__}/fulfilled.jpg`,
};
Normal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/fulfilled.jpg`, async (_, res, ctx) => {
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
	src: `${__API__}/error.jpg`,
};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/error.jpg`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const NormalLoading: Story = {
	decorators: [getThemeDecorator({ invert: true })],
};
NormalLoading.args = {
	src: `${__API__}/loading.jpg`,
	theme: 'normal',
};
NormalLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/loading.jpg`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const InvertLoading: Story = {
	decorators: [getThemeDecorator()],
};
InvertLoading.args = {
	src: `${__API__}/loading.jpg`,
	theme: 'invert',
};
InvertLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/loading.jpg`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};
