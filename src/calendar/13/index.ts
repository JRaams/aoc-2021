import Grid from './grid';
import CalendarDay from '../calendarDay';

export default class Day13 extends CalendarDay {
  public solveA(): number {
    const grid = new Grid(this.lines);
    // grid.printGrid();
    grid.fold();
    // grid.printGrid();
    // grid.fold();
    // grid.printGrid();
    return grid.dotCount;
  }

  public solveB(): number {
    return 13.2;
  }
}
