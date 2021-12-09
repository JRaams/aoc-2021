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

  public solveB(): number {
    return 9.2;
  }
}
