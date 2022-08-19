class Generator {
  private *idGenerator(start: number, end: number, step: number) {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
  private newGen = this.idGenerator(this.start, this.end, this.step);

  constructor(private start: number = 1, private end: number = Infinity, private step: number = 1) {}

  getId () {
    const { done, value } = this.newGen.next();
    if (done) throw new Error('DB full!');
    return value;
  }
}

export { Generator };