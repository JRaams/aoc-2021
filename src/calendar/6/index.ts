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
    const school: number[] = Array(9).fill(0);

    fish.forEach((f: number) => {
      school[f]++;
    });

    for (let day = 0; day < days; day++) {
      const first: number = school.shift()!;
      school.push(first);
      school[6] += school[8];
    }

    return school.reduce((total, current) => total + current);
  }
}
