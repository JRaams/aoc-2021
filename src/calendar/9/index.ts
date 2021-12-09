import CalendarDay from '../calendarDay';

export default class Day9 extends CalendarDay {
  isGreater(heightMap: number[][], y: number, x: number, height: number): boolean {
    if (heightMap[y] === undefined || heightMap[y][x] === undefined) return true;
    return heightMap[y][x] > height;
  }

  public solveA(): number {
    const heightMap: number[][] = this.lines.map((line: string) => line.split('').map(Number));

    let riskLevel = 0;

    for (let y = 0; y < heightMap.length; y++) {
      const line = heightMap[y];
      for (let x = 0; x < line.length; x++) {
        const height = line[x];

        if (
          this.isGreater(heightMap, y - 1, x, height) &&
          this.isGreater(heightMap, y, x + 1, height) &&
          this.isGreater(heightMap, y + 1, x, height) &&
          this.isGreater(heightMap, y, x - 1, height)
        ) {
          riskLevel += height + 1;
        }
      }
    }

    return riskLevel;
  }

  getBasinSize(y: number, x: number, heightMap: number[][], basins: number[]): void {
    // Check array bounds
    if (y < 0 || y >= heightMap.length || x < 0 || x >= heightMap[0].length) {
      return;
    }
    // Check if its a basin wall or we have 'seen' this location already
    if (heightMap[y][x] === 9 || heightMap[y][x] === -1) {
      return;
    }

    // Mark current location as 'seen'
    heightMap[y][x] = -1;
    // Increase size of current basin
    basins[basins.length - 1] += 1;
    // DFS to other locations in the same basin
    this.getBasinSize(y - 1, x, heightMap, basins);
    this.getBasinSize(y, x + 1, heightMap, basins);
    this.getBasinSize(y + 1, x, heightMap, basins);
    this.getBasinSize(y, x - 1, heightMap, basins);
  }

  public solveB(): number {
    const heightMap: number[][] = this.lines.map((line: string) => line.split('').map(Number));

    const basins = [];

    // Walk through all locations to mark basins
    for (let y = 0; y < heightMap.length; y++) {
      const line = heightMap[y];
      for (let x = 0; x < line.length; x++) {
        basins.push(0);
        this.getBasinSize(y, x, heightMap, basins);
      }
    }

    // Sort basin size
    basins.sort((a, b) => b - a);
    // Multiply 3 largest basin counts to get the result
    const result = basins.splice(0, 3).reduce((total, current) => total * current, 1);
    return result;
  }
}
