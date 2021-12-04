import CalendarDay from '../calendarDay';
export default class Day1 extends CalendarDay {
  public solveA(): number {
    const numbers = this.lines.map(Number);

    let increments = 0;

    let prev: number = Infinity;
    numbers.forEach((current: number) => {
      if (prev && current > prev) {
        increments++;
      }
      prev = current;
    });

    return increments;
  }

  public solveB(): number {
    const numbers = this.lines.map(Number);
    let result = 0;

    for (let i = 0; i < numbers.length - 3; i++) {
      const windowA = numbers[i] + numbers[i + 1] + numbers[i + 2];
      const windowB = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];

      if (windowB > windowA) {
        result++;
      }
    }

    return result;
  }
}
