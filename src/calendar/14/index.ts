import CalendarDay from '../calendarDay';
import Polymer from './polymer';

export default class Day14 extends CalendarDay {
  public solveA(): number {
    const polymer = new Polymer(this.lines);
    return polymer.findOptimalPolymer(10);
  }

  public solveB(): number {
    const polymer = new Polymer(this.lines);
    return polymer.findOptimalPolymer(40);
  }
}
