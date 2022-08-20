class SequentialIntegerGenerator {
  private static DEFAULT_CONFIG: Required<IDGeneratorConfig> = {
    start: 0,
    step: 1,
    end: Number.MAX_SAFE_INTEGER
  };

  private *generate(start: number, end: number, step: number) {
    for (let i = start; i <= end; i += step) {
      yield i + step;
    }
  }

  private getConfig(config?: IDGeneratorConfig): Required<IDGeneratorConfig> {
    const { end, start, step } = SequentialIntegerGenerator.DEFAULT_CONFIG;

    if (!config) {
      return {
        end,
        step,
        start
      };
    }

    return {
      end: config.end || end,
      step: config.step || step,
      start: config.start || start
    };
  }

  private generator;

  constructor(config?: IDGeneratorConfig) {
    const { start, end, step } = this.getConfig(config);
    this.generator = this.generate(start, end, step);
  }

  getId() {
    const { done, value } = this.generator.next();
    if (done) throw new Error('DB full!');
    return value;
  }
}

export { SequentialIntegerGenerator };
