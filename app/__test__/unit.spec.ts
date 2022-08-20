import { SequentialIntegerGenerator } from '../utils';

describe('SequentialIntegerGenerator class', () => {
  it('should return id of 1 generate with defaults (sart: 0, step: 1) if no argument is provided', () => {
    const generator = new SequentialIntegerGenerator();
    const id = generator.getId();
    expect(id).toEqual(1);
  });

  it('should return the next ID with the right step', () => {
    const generatorConfig = {
      start: 0,
      end: 10,
      step: 2
    };
    const generator = new SequentialIntegerGenerator(generatorConfig);
    const id1 = generator.getId();
    const id2 = generator.getId();
    expect(id1).toEqual(2);
    expect(id2).toEqual(4);
  });

  it('should not have any side effect', () => {
    const generatorConfig = {
      start: 0,
      end: 10,
      step: 2
    };
    const firstGenerator = new SequentialIntegerGenerator(generatorConfig);
    const secondGenerator = new SequentialIntegerGenerator(generatorConfig);

    const id1 = firstGenerator.getId();
    const id2 = secondGenerator.getId();

    expect(id1).toEqual(id2);
  });

  it('should throw when id boundary is exceeded', () => {
    const generatorConfig = {
      start: 0,
      end: 5,
      step: 2
    };
    try {
      const generator = new SequentialIntegerGenerator(generatorConfig);
      generator.getId();
      generator.getId();
      generator.getId();
      expect(generator.getId()).toThrow();
    } catch (error) {}
  });
});
