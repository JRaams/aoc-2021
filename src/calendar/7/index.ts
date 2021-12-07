import CalendarDay from '../calendarDay';

export default class Day7 extends CalendarDay {
  public solveA(): number {
    const input = this.lines[0].split(',').map(Number);
    input.sort((a, b) => a - b);

    // Get target position where each crab is going to move towards (median)
    const targetIdx = input.length / 2 - 1;
    const target = input[targetIdx];

    // Move all crabs towards the target
    const totalFuel = input.reduce((total, current) => total + Math.abs(current - target), 0);
    return totalFuel;
  }

  public solveB(): number {
    const input = this.lines[0].split(',').map(Number);
    input.sort((a, b) => a - b);

    // Get target position where each crab is going to move towards (average)
    const positionSum = input.reduce((total, current) => total + current);
    const target = Math.floor(positionSum / input.length);

    // Move all crabs towards the target
    const totalFuel = input.reduce((total, current) => {
      let cost = Math.abs(current - target);
      cost = 0.5 * cost * (cost + 1); // Triangular number function (thanks ALGA)
      return total + cost;
    }, 0);
    return totalFuel;
  }
}
