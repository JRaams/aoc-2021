import CalendarDay from '../calendarDay';

export default class Day6 extends CalendarDay {
  public solveA(): number {
    const fish = this.lines[0].split(',').map(Number);
    return this.simulate(fish, 80);
  }

  public solveB(): number {
    const fish = this.lines[0].split(',').map(Number);
    return this.simulate(fish, 256);
  }

  private simulate(fish: number[], days: number) {
    const fishCycles: any = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    };

    fish.forEach((f: number) => {
      fishCycles[f]++;
    });

    for (let day = 0; day < days; day++) {
      let newSpawnCount = 0;
      let resetCount = 0;

      Object.keys(fishCycles).forEach((key: string) => {
        if (key === '0') {
          resetCount += fishCycles[0];
          newSpawnCount += fishCycles[0];
          fishCycles[0] = 0;
        } else {
          fishCycles[Number(key) - 1] += fishCycles[key];
          fishCycles[key] = 0;
        }
      });

      fishCycles[6] += resetCount;
      fishCycles[8] += newSpawnCount;
    }

    const count = Object.values(fishCycles)
      .map(Number)
      .reduce((total, current) => total + current);

    return count;
  }
}
