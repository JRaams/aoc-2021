export class Point {
  public x: number;
  public y: number;
  public covers: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Floor {
  public points: Point[][];

  constructor() {
    this.points = [];
  }

  /**
   * Get a point at a position
   * @param x: number, the x position
   * @param y: number, the y position
   * @returns Point
   */
  getPoint(x: number, y: number): Point {
    if (this.points[y] === undefined) {
      this.points[y] = [];
    }

    if (this.points[y][x] === undefined) {
      this.points[y][x] = new Point(x, y);
    }

    return this.points[y][x];
  }

  /**
   * Get a list of all Points that is covered by more than 1 line
   * @returns Point[]
   */
  getDangerousPoints(): Point[] {
    const result: Point[] = [];

    this.points.forEach((row: Point[]) => {
      row.forEach((p: Point) => {
        if (p.covers > 1) {
          result.push(p);
        }
      });
    });

    return result;
  }

  /**
   * Fill points according to the given lines
   * @param lines: string[], the content of input.txt
   * @param diagonals: boolean = false, whether or not diagonal lines should be used
   */
  fill(lines: string[], diagonals: boolean = false): void {
    lines.forEach((line: string) => {
      const points = line.split(' -> ');
      const [x1, y1] = points[0].split(',').map(Number);
      const [x2, y2] = points[1].split(',').map(Number);

      // x the same -> vertical line
      if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          this.getPoint(x1, y).covers++;
        }
        // y the same -> horizontal line
      } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          this.getPoint(x, y1).covers++;
        }
        // x and y both different -> diagonal line
      } else if (diagonals) {
        const max = Math.abs(x2 - x1);
        let x = x1;
        let y = y1;

        for (let index = 0; index <= max; index++) {
          this.getPoint(x, y).covers++;
          x += x2 > x1 ? 1 : -1;
          y += y2 > y1 ? 1 : -1;
        }
      }
    });
  }
}
