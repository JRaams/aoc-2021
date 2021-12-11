import CalendarDay from '../calendarDay';

class Octopus {
  energy: number;
  neighbours: Octopus[];
  isFlashing: boolean;

  constructor(energy: number) {
    this.energy = energy;
    this.neighbours = [];
    this.isFlashing = false;
  }

  /**
   * Increase energy level by 1
   * @returns number the amount of flashes that occured thanks to this octopus
   */
  increaseEnergy(): number {
    // First, the energy level of each octopus increases by 1.
    this.energy++;

    // Then, any octopus with an energy level greater than 9 flashes.
    if (this.energy > 9 && !this.isFlashing) {
      this.isFlashing = true;

      // This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
      const neighbourFlashes = this.neighbours
        .map((n) => n.increaseEnergy())
        .reduce((total, current) => total + current);

      return 1 + neighbourFlashes;
    }

    return 0;
  }
}

class Grid {
  octopuses: Octopus[][];

  constructor(input: string[]) {
    this.octopuses = input.map((line: string) => line.split('').map((char: string) => new Octopus(Number(char))));

    // For each octupus in the grid...
    for (let y = 0; y < this.octopuses.length; y++) {
      const line = this.octopuses[y];
      for (let x = 0; x < line.length; x++) {
        const octo = line[x];

        // ... add its neighbours
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            // Don't add itself to neighbours
            if (y === ny && x === nx) continue;

            if (this.octopuses[ny] && this.octopuses[ny][nx]) {
              octo.neighbours.push(this.octopuses[ny][nx]);
            }
          }
        }
      }
    }
  }

  private octopusIterator(): Octopus[] {
    const result = [];
    for (let y = 0; y < this.octopuses.length; y++) {
      const line = this.octopuses[y];
      for (let x = 0; x < line.length; x++) {
        const octo = line[x];
        result.push(octo);
      }
    }
    return result;
  }

  /**
   * Model energy levels in a single step
   * @returns The number of flashes that occured during the step
   */
  step(): number {
    const octos = this.octopusIterator();
    let flashes = 0;

    octos.forEach((o) => {
      flashes += o.increaseEnergy();
    });

    // Reset flashing state
    octos.forEach((o) => {
      o.isFlashing = false;
      if (o.energy > 9) {
        o.energy = 0;
      }
    });

    return flashes;
  }
}

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
    const totalOctopuses = grid.octopuses.length * grid.octopuses[0].length;

    let step = 1;

    let flashCount = grid.step();
    while (flashCount !== totalOctopuses) {
      flashCount = grid.step();
      step++;
    }

    return step;
  }
}
