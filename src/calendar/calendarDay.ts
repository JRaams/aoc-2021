import path from 'path';
import fs from 'fs';

export default abstract class CalendarDay {
  protected lines: string[];

  constructor(day: string) {
    const inputPath = path.join(__dirname, day, `input.txt`);
    const inputBuffer = fs.readFileSync(inputPath);
    const input = inputBuffer.toString();
    this.lines = input.split('\n');
  }

  static async loadDay(dayNumber: string): Promise<CalendarDay> {
    const day = await import(`./${dayNumber}`);
    return new day.default(dayNumber); // eslint-disable-line new-cap
  }

  public solve(part: string): number {
    if (part === 'a') {
      return this.solveA();
    } else {
      return this.solveB();
    }
  }

  public abstract solveA(): number;
  public abstract solveB(): number;
}
