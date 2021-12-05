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
  public points: Point[];

  constructor() {
    this.points = [];
  }

  getPoint(x: number, y: number): Point {
    // Try finding already existing point
    for (let index = 0; index < this.points.length; index++) {
      const element = this.points[index];
      if (element.x === x && element.y === y) {
        return element;
      }
    }

    // Create new point
    const newPoint = new Point(x, y);
    this.points.push(newPoint);
    return newPoint;
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

    const dangerousPoints = floor.points.filter((p) => p.covers > 1);
    return dangerousPoints.length;
  }

  public solveB(): number {
    return 5.2;
  }
}
