import CalendarDay from '../calendarDay';
import { BingoSystem } from './bingoSystem';

export default class Day4 extends CalendarDay {
  public solveA(): number {
    const bingoSystem = new BingoSystem(this.lines);

    return 4.1;
  }

  public solveB(): number {
    return 4.2;
  }
}
