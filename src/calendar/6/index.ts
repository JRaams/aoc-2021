import CalendarDay from '../calendarDay';

export default class Day6 extends CalendarDay {
  public solveA(): number {
    const fish = this.lines[0].split(',').map(Number);

    for (let day = 0; day < 80; day++) {
      for (let fishIdx = fish.length - 1; fishIdx >= 0; fishIdx--) {
        // Subtract a day
        fish[fishIdx]--;

        // If reached 0 days, reset and spawn child
        if (fish[fishIdx] < 0) {
          fish[fishIdx] = 6;
          fish.push(8);
        }
      }
    }

    return fish.length;
  }

  public solveB(): number {
    return 6.2;
  }
}
