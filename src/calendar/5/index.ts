import CalendarDay from '../calendarDay';
import { Floor } from './floor';

export default class Day5 extends CalendarDay {
  public solveA(): number {
    const floor = new Floor();
    floor.fill(this.lines);

    return floor.getDangerousPoints().length;
  }

  public solveB(): number {
    const floor = new Floor();
    floor.fill(this.lines, true);

    return floor.getDangerousPoints().length;
  }
}
