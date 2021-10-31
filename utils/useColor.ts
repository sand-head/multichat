import { useEffect, useState } from 'react';

interface Color {
  background: string;
  foreground: string;
}

const BASE = {
  red: 128,
  green: 128,
  blue: 128,
};

const CHANNEL_COLOR_MAP = new Map<string, Color>();
const getColorFromMap = (input: string): Color => {
  if (!CHANNEL_COLOR_MAP.has(input)) {
    CHANNEL_COLOR_MAP.set(input, generateColor(input));
  }

  return CHANNEL_COLOR_MAP.get(input)!;
};

/// Takes the bitwise XOR of two numbers to create a seed.
const getSeed = (a: number, b: number): number => a ^ b;

/// Generates a random color pair given an input string to seed off of.
const generateColor = (input: string): Color => {
  // generate the seed from the input string
  let seed = input.match(/.{1,2}/g)!.reduce((prev, curr) => {
    return prev ^ getSeed(curr.charCodeAt(0), curr.charCodeAt(1));
  }, 0);

  // generate random numbers for each color
  const rand_1 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_2 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_3 = Math.abs(Math.sin(seed++) * 10000) % 256;

  // generate background colors using the base values and return the hex code
  const red = Math.round((rand_1 + BASE.red) / 2);
  const green = Math.round((rand_2 + BASE.green) / 2);
  const blue = Math.round((rand_3 + BASE.blue) / 2);

  // calculate luminance from those colors for foreground
  const luminance = 0.2126 * red + 0.7151 * green + 0.0721 * blue;

  return {
    background: `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`,
    foreground: luminance < 140 ? '#fff' : '#000',
  };
};

export const useColor = (input: string): Color => {
  const [color, setColor] = useState<Color>(getColorFromMap(input));

  useEffect(() => setColor(getColorFromMap(input)), [input]);

  return color!;
};
