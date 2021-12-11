import Octopus from './octopus';

export default class Grid {
  octopuses: Octopus[];

  constructor(input: string[]) {
    const octopusGrid = input.map((line: string) => line.split('').map((char: string) => new Octopus(Number(char))));

    // For each octupus in the grid...
    for (let y = 0; y < octopusGrid.length; y++) {
      const line = octopusGrid[y];
      for (let x = 0; x < line.length; x++) {
        const octo = line[x];

        // ... add its neighbours
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            // Don't add itself to neighbours
            if (y === ny && x === nx) continue;

            if (octopusGrid[ny] && octopusGrid[ny][nx]) {
              octo.neighbours.push(octopusGrid[ny][nx]);
            }
          }
        }
      }
    }

    // Convert grid of octopuses to list
    this.octopuses = [];
    for (let y = 0; y < octopusGrid.length; y++) {
      const line = octopusGrid[y];
      for (let x = 0; x < line.length; x++) {
        const octo = line[x];
        this.octopuses.push(octo);
      }
    }
  }

  /**
   * Model energy levels in a single step
   * @returns The number of flashes that occured during the step
   */
  step(): number {
    let flashes = 0;

    this.octopuses.forEach((o) => {
      flashes += o.increaseEnergy();
    });

    // Reset flashing state
    this.octopuses.forEach((o) => {
      o.isFlashing = false;
      if (o.energy > 9) {
        o.energy = 0;
      }
    });

    return flashes;
  }
}
