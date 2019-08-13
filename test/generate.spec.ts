import { generate } from "../index";

describe("typvp Generate", () => {
  it("Returns the expected length array (crypto)", () => {
    const gen = generate(20, { crypto: true });
    expect(gen.length).toBe(20);
  });

  it("Returns the expected length array", () => {
    const gen = generate(20);
    expect(gen.length).toBe(20);
  });

  it("Respects the length boundaries", () => {
    const gen = generate(20, {
      minLength: 3,
      maxLength: 6,
      crypto: true
    }) as string[];
    let withinBounds = true;
    console.log(gen);
    gen.forEach(word => {
      if (word.length <= 3 || word.length >= 6) {
        withinBounds = false;
      } else {
        return;
      }
    });
    expect(withinBounds).toBe(true);
  });

  it("Doesn't die with bad length boundaries", () => {
    const gen = generate(20, {
      minLength: 20,
      maxLength: 30,
      crypto: true
    }) as string[];
    expect(gen.length).toBe(0);
  });

  it("Doesn't die with bad length boundaries(2)", () => {
    const gen = generate(1, {
      minLength: 20,
      maxLength: 30
    }) as string[];
    expect(typeof gen).toBe("string");
  });

  it("Will return a single word (crypto)", () => {
    const gen = generate(1, {
      minLength: 1,
      maxLength: 20,
      crypto: true
    }) as string[];
    expect(typeof gen).toBe("string");
  });

  it("Will return a single word", () => {
    const gen = generate(1, {
      minLength: 1,
      maxLength: 20
    }) as string[];
    expect(typeof gen).toBe("string");
  });
});
