import CalendarDay from '../calendarDay';
import Grid from './grid';

export default class Day11 extends CalendarDay {
  public solveA(): number {
    const grid = new Grid(this.lines);

    let result = 0;
    for (let i = 0; i < 100; i++) {
      result += grid.step();
    }
    return result;
  }

  public solveB(): number {
    const grid = new Grid(this.lines);
    const totalOctopuses = grid.octopuses.length;

    let step = 1;

    let flashCount = grid.step();
    while (flashCount !== totalOctopuses) {
      flashCount = grid.step();
      step++;
    }

    return step;
  }
}
