class SequentialIntegerGenerator {
  private START: number = 0;
  private END: number = Infinity;
  private STEP: number = 1;

  private *generate(start: number, end: number, step: number) {
    for (let i = start; i <= end; i += step) {
      yield i + step;
    }
  }

  private getConfig(config?: IDGeneratorConfig): Required<IDGeneratorConfig> {
    if (!config) {
      return {
        end: this.END,
        step: this.STEP,
        start: this.START
      };
    }

    return {
      end: config.end || this.END,
      step: config.step || this.STEP,
      start: config.start || this.START
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
