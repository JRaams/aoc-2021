import CalendarDay from '../calendarDay';
import Polymer from './polymer';

export default class Day14 extends CalendarDay {
  public solveA(): number {
    const polymer = new Polymer(this.lines);

    for (let i = 0; i < 10; i++) {
      polymer.step();
    }

    return polymer.size;
  }

  public solveB(): number {
    return 14.2;
  }
}
