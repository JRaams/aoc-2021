import CalendarDay from '../calendarDay';
import Polymer from './polymer';

export default class Day14 extends CalendarDay {
  public solveA(): number {
    const polymer = new Polymer(this.lines);

    for (let i = 0; i < 10; i++) {
      polymer.step();
    }

    const elementCount = (Object.values(polymer.charCount) as number[]).filter((v) => v);
    elementCount.sort((a, b) => a - b);

    const result = elementCount[elementCount.length - 1] - elementCount[0];
    return result;
  }

  public solveB(): number {
    const polymer = new Polymer(this.lines);

    for (let i = 0; i < 40; i++) {
      polymer.step();
    }

    const elementCount = (Object.values(polymer.charCount) as number[]).filter((v) => v);
    elementCount.sort((a, b) => a - b);

    const result = elementCount[elementCount.length - 1] - elementCount[0];
    return result;
  }
}
