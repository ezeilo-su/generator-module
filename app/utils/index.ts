class Generator {
  private *generate(start: number, end: number, step: number) {
    for (let i = start; i <= end; i += step) {
      yield i + step;
    }
  }

  private getConfig(config?: IDGeneratorConfig): Required<IDGeneratorConfig> {
    let start: number = 0;
    let end: number = Infinity;
    let step: number = 1;

    if (config) {
      end = config.end || end;
      step = config.step || step;
      start = config.start || start;
    }
    return { start, end, step };
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

export { Generator };
