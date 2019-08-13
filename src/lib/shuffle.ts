import { Random } from "../lib/random";

export function shuffle(words: string[]) {
  let i = 0;
  let j = 0;
  let temp = "";

  for (i = words.length - 1; i > 0; i -= 1) {
    j = Random.range(0, i + 1);

    temp = words[i];
    words[i] = words[j];
    words[j] = temp;
  }
}
