import Grid from './grid';
import CalendarDay from '../calendarDay';

export default class Day13 extends CalendarDay {
  public solveA(): number {
    const grid = new Grid(this.lines);
    grid.fold();
    return grid.dotCount;
  }

  public solveB(): number {
    const grid = new Grid(this.lines);

    let maxY = Infinity;

    while (maxY > 6) {
      grid.fold();
      maxY = grid.maxY;
    }
    grid.printGrid();

    return -1;
  }
}
