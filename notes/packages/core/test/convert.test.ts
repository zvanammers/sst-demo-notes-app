import { expect, test } from 'vitest';
import { convertCelcius, convertFahrenheit } from '../src/convert';

test('Convert celius to fahrenheit', () => {
	expect(convertCelcius(0)).toBe(32);
	expect(convertCelcius(-100)).toBe(-148);
	expect(convertCelcius(100)).toBe(212);
});

test('Convert fahrenheit to celcius', () => {
	expect(convertFahrenheit(32)).toBe(0);
	expect(convertFahrenheit(-148)).toBe(-100);
	expect(convertFahrenheit(212)).toBe(100);
});
