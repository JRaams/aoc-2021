export default class Octopus {
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
