export default class Polymer {
  private template: string;
  private rules: string[][];
  private pairs: any = {};
  public charCount: any = {};

  constructor(lines: string[]) {
    this.template = lines.splice(0, 2)[0];
    this.rules = lines.map((l) => l.split(' -> '));

    // Set initial pairs based on template
    for (let i = 0; i < this.template.length - 1; i++) {
      this.inc(this.pairs, this.template[i] + this.template[i + 1], 1);
    }

    // Count chars that are in the template
    this.template.split('').forEach((c) => {
      this.inc(this.charCount, c, 1);
    });
  }

  private inc(arr: any, idx: string, amount: number): void {
    if (arr[idx] === undefined) {
      arr[idx] = 0;
    }
    arr[idx] += amount;
  }

  public step(): void {
    const queue: any = [];

    // Find out what rules match each pair
    for (const [pair, value] of Object.entries(this.pairs)) {
      const rule = this.rules.find((r) => r[0] === pair);
      if (!rule) continue;

      queue.push({ pair, rule, value });
    }

    // For each item in the queue, update pairs/charcount
    for (const { pair, rule, value } of queue) {
      this.inc(this.pairs, pair, -value);

      const leftPair = pair[0] + rule[1];
      this.inc(this.pairs, leftPair, value);

      const rightPair = rule[1] + pair[1];
      this.inc(this.pairs, rightPair, value);

      this.inc(this.charCount, rule[1], value);
    }
  }

  public get size() {
    return (Object.values(this.pairs) as number[]).reduce((total, current) => total + current);
  }
}
