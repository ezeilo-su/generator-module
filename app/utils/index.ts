class SequentialIntegerGenerator {
  private DEFAULT_START: number = 0;
  private DEFAULT_END: number = Infinity;
  private DEFAULT_STEP: number = 1;

  private *generate(start: number, end: number, step: number) {
    for (let i = start; i <= end; i += step) {
      yield i + step;
    }
  }

  private getConfig(config?: IDGeneratorConfig): Required<IDGeneratorConfig> {
    if (!config) {
      return {
        end: this.DEFAULT_END,
        step: this.DEFAULT_STEP,
        start: this.DEFAULT_START
      };
    }

    return {
      end: config.end || this.DEFAULT_END,
      step: config.step || this.DEFAULT_STEP,
      start: config.start || this.DEFAULT_START
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
