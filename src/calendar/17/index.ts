import CalendarDay from '../calendarDay';
import Trench from './trench';

export default class Day17 extends CalendarDay {
  public solveA(): number {
    const trench = new Trench(this.lines[0]);
    const result = trench.getHighestProbePosition();
    return result.maxY;
  }

  public solveB(): number {
    const trench = new Trench(this.lines[0]);
    const result = trench.getHighestProbePosition();
    return result.hitCount;
  }
}
