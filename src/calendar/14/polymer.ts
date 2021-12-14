export default class Polymer {
  private template: string;
  private rules: string[][];
  private pairs: any = {};

  constructor(lines: string[]) {
    this.template = lines.splice(0, 2)[0];
    this.rules = lines.map((l) => l.split(' -> '));

    for (let i = 0; i < this.template.length - 1; i++) {
      this.pairs[this.template[i] + this.template[i + 1]] = 1;
    }
  }

  public step(): void {
    const queue: any = [];

    for (const [pair, value] of Object.entries(this.pairs)) {
      const rule = this.rules.find((r) => r[0] === pair);
      if (!rule) continue;

      for (let i = 0; i < (value as number); i++) {
        queue.push({
          rule,
          pair,
        });
      }
    }

    for (const { pair, rule } of queue) {
      this.pairs[pair]--;
      if (this.pairs[pair] < 0) {
        this.pairs[pair] = 0;
      }

      const leftPair = pair[0] + rule[1];
      if (this.pairs[leftPair] === undefined) {
        this.pairs[leftPair] = 0;
      }
      this.pairs[leftPair]++;

      const rightPair = rule[1] + pair[1];
      if (this.pairs[rightPair] === undefined) {
        this.pairs[rightPair] = 0;
      }
      this.pairs[rightPair]++;
    }
  }

  public get size() {
    return (Object.values(this.pairs) as number[]).reduce((total, current) => total + current);
  }
}
