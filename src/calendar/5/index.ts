import CalendarDay from '../calendarDay';

class Point {
  public x: number;
  public y: number;
  public covers: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Floor {
  public points: Point[][];

  constructor() {
    this.points = [];
  }

  getPoint(x: number, y: number): Point {
    if (this.points[y] === undefined) {
      this.points[y] = [];
    }

    if (this.points[y][x] === undefined) {
      this.points[y][x] = new Point(x, y);
    }

    return this.points[y][x];
  }

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
}

export default class Day5 extends CalendarDay {
  public solveA(): number {
    const floor = new Floor();

    this.lines.forEach((line: string) => {
      const points = line.split(' -> ');
      const [x1, y1] = points[0].split(',').map(Number);
      const [x2, y2] = points[1].split(',').map(Number);

      // x the same -> vertical line
      if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          floor.getPoint(x1, y).covers++;
        }
        // y the same -> horizontal line
      } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          floor.getPoint(x, y1).covers++;
        }
        // x and y both different -> diagonal line
      } else {
        // console.info('diagonal');
      }
    });

    return floor.getDangerousPoints().length;
  }

  public solveB(): number {
    return 5.2;
  }
}
