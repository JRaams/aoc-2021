export default abstract class CalendarDay {
  protected dayNumber: number;

  constructor(dayNumber: number) {
    this.dayNumber = dayNumber;
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
