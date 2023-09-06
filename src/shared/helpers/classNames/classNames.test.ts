import { describe, expect, test } from '@jest/globals';
import { classNames } from './classNames';

describe('classNames', () => {
	test('with empty classes', () => {
		expect(classNames([])).toEqual('');
		expect(classNames([], {})).toEqual('');
	});

	test('with classes', () => {
		expect(classNames(['class1'])).toEqual('class1');
		expect(classNames(['class1', undefined])).toEqual('class1');
		expect(classNames(['class1', 'class2'])).toEqual('class1 class2');
		expect(classNames(['class1', undefined, 'class2'])).toEqual(
			'class1 class2'
		);
	});

	test('with classesByCondition', () => {
		expect(classNames([], { class1: true })).toEqual('class1');
		expect(classNames([], { class1: true, class2: true })).toEqual(
			'class1 class2'
		);
		expect(classNames([], { class1: false, class2: false })).toEqual('');
		expect(classNames([], { class1: true, class2: false })).toEqual('class1');
	});

	test('with classes and with classesByCondition', () => {
		expect(classNames(['class1'], { class2: false })).toEqual('class1');
		expect(classNames(['class1'], { class2: true })).toEqual('class1 class2');
		expect(
			classNames(['class1', 'class2'], { class3: true, class4: true })
		).toEqual('class1 class2 class3 class4');
		expect(
			classNames(['class1', 'class2'], { class3: false, class4: false })
		).toEqual('class1 class2');
		expect(
			classNames(['class1', 'class2'], { class3: false, class4: true })
		).toEqual('class1 class2 class4');
	});
});
