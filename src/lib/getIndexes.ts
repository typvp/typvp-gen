import { Random } from '../lib/random';

export const generateIndexes = (length: number, count: number): number[] => {
  const indexes = [];
  while (true) {
    const index = Random.range(0, length);

    if (indexes.indexOf(index) === -1) indexes.push(index);

    if (indexes.length === count) break;
    else if (length < count && indexes.length === length) break;
  }
  return indexes;
};
