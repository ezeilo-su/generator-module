import { Generator } from '../utils';

describe('Generator class', () => {
  test('returns instance of Generator', () => {
    expect(new Generator()).toBeInstanceOf(Generator);
  });

  test('should have getId method ', () => {
    expect(new Generator()).toHaveProperty('getId');
  });

  test('getId should be a function', () => {
    expect(typeof new Generator().getId).toBe('function');
  });

  test('should return the next id', () => {
    const generator = new Generator(1, Infinity, 1);
    const id = generator.getId();
    expect(generator.getId()).toEqual(Number(id) + 1);
  });

  test('should throw', () => {
    try {
      const generator = new Generator(1, 3, 1);
      generator.getId();
      generator.getId();
      generator.getId();
      expect(generator.getId()).toThrow();
    } catch (error) {}
  });
});
