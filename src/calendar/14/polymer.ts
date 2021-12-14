export default class Polymer {
  private template: string;
  private rules: string[][];
  private pairs: any = {};
  public charCount: any = {};

  constructor(lines: string[]) {
    this.template = lines.splice(0, 2)[0];
    this.rules = lines.map((l) => l.split(' -> '));

    // Fill charCount and pairs with default (0) values
    const alfa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alfa.split('').forEach((char: string) => {
      this.charCount[char] = 0;

      alfa.split('').forEach((char2: string) => {
        this.pairs[char + char2] = 0;
      });
    });

    // Set initial pairs based on template
    for (let i = 0; i < this.template.length - 1; i++) {
      this.pairs[this.template[i] + this.template[i + 1]]++;
    }

    // Count chars that are in the template
    this.template.split('').forEach((c) => {
      this.charCount[c]++;
    });
  }

  public step(): void {
    const queue: any = [];

    // Find out what rules match each pair
    for (const [pair, value] of Object.entries(this.pairs)) {
      const rule = this.rules.find((r) => r[0] === pair);
      if (!rule) continue;

      for (let i = 0; i < (value as number); i++) {
        queue.push({ pair, rule });
      }
    }

    // For each item in the queue, update pairs/charcount
    for (const { pair, rule } of queue) {
      this.pairs[pair]--;

      const leftPair = pair[0] + rule[1];
      this.pairs[leftPair]++;

      const rightPair = rule[1] + pair[1];
      this.pairs[rightPair]++;

      this.charCount[rule[1]]++;
    }
  }

  public get size() {
    return (Object.values(this.pairs) as number[]).reduce((total, current) => total + current);
  }
}
