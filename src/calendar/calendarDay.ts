export default abstract class CalendarDay {
  protected dayNumber: number;

  constructor(dayNumber: number) {
    this.dayNumber = dayNumber;
  }

  static async loadDay(dayNumber: string): Promise<CalendarDay> {
    const day = await import(`./${dayNumber}`);
    return new day.default();
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
