import { wordList } from './words';
import { generateIndexes } from './lib/getIndexes';

interface GenerateOptions {
  minLength?: number;
  maxLength?: number;
  formatter?(word: string, index: number): string;
  formatter?(word: string): string;
  join?: string;
  crypto?: boolean;
}

export function generate(exactly: number = 1, opt?: GenerateOptions) {
  opt = { crypto: false, minLength: 1, maxLength: 14, ...opt };
  let pool: string[] | string = [];

  // Attempt to skip filtering
  if (opt.minLength === 1 && opt.maxLength === 14) {
    pool = wordList;
  } else {
    pool = wordList.filter(word => {
      if (word.length < opt!.minLength! || word.length > opt!.maxLength!) {
        return false;
      } else return true;
    });
  }

  // No Matches
  if (!pool.length) return exactly === 1 ? '' : [];

  // If we are choosing a crypto random index
  if (opt.crypto) {
    const indexes = generateIndexes(pool.length, exactly);
    const temp: string[] = [];

    indexes.forEach(index => temp.push(pool[index]));
    pool = temp;
    // Else, use Math.random to get the array
  } else {
    const temp: string[] = [];
    while (temp.length <= exactly - 1) {
      const rInt = Math.floor(Math.random() * pool.length);
      temp.push(pool[rInt]);
    }
    pool = temp;
  }

  if (__DEV__ && opt.join && exactly === 1) {
    console.warn(
      'Warning: [@typvp/gen] Using the join option when exactly = 1 will be ignored',
    );
  }

  if (opt.join && exactly > 1) {
    pool = pool.join(opt.join);
  }

  return exactly === 1 ? pool[0] : pool;
}
