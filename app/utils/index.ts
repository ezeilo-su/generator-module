interface IDGeneratorConfig {
  end?: number;
  step?: number;
  start?: number;
}

class SequentialIntegerGenerator {
  private static DEFAULT_CONFIG: Required<IDGeneratorConfig> = {
    start: 0,
    step: 1,
    end: Number.MAX_SAFE_INTEGER
  };

  private generator;

  constructor(config?: IDGeneratorConfig) {
    const { start, end, step } = this.getConfig(config);
    this.generator = this.generate(start, end, step);
  }

  private *generate(start: number, end: number, step: number) {
    for (let i = start; i <= end; i += step) {
      yield i + step;
    }
  }

  private getConfig(config?: IDGeneratorConfig): Required<IDGeneratorConfig> {
    const {
      end: defaultEnd,
      start: defaultStart,
      step: defaultStep
    } = SequentialIntegerGenerator.DEFAULT_CONFIG;

    if (!config) {
      return {
        end: defaultEnd,
        step: defaultStep,
        start: defaultStart
      };
    }

    return {
      end: config.end || defaultEnd,
      step: config.step || defaultStep,
      start: config.start || defaultStart
    };
  }

  getId() {
    const { done, value } = this.generator.next();
    if (done) throw new Error('DB full!');
    return value;
  }
}

export { SequentialIntegerGenerator };
