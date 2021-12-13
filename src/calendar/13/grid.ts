interface Dot {
  x: number;
  y: number;
}

interface Fold {
  isX: boolean;
  value: number;
}

export default class Grid {
  private dots: Dot[];
  private folds: Fold[];

  constructor(input: string[]) {
    this.dots = [];
    this.folds = [];

    input.forEach((line: string) => {
      if (line.indexOf('fold') !== -1) {
        const data = line.split('along ')[1];
        const [direction, value] = data.split('=');
        this.folds.push({ isX: direction === 'x', value: Number(value) });
      } else if (line.length) {
        const [x, y] = line.split(',').map(Number);
        this.dots.push({ x, y });
      }
    });
  }

  public get dotCount(): number {
    return Array.from(this.dots.values()).length;
  }

  public get maxY(): number {
    let maxY = 0;

    this.dots.forEach((dot: Dot) => {
      if (dot.y > maxY) {
        maxY = dot.y;
      }
    });

    return maxY;
  }

  public get maxX(): number {
    let maxX = 0;

    this.dots.forEach((dot: Dot) => {
      if (dot.x > maxX) {
        maxX = dot.x;
      }
    });

    return maxX;
  }

  private getDot(dots: Dot[], x: number, y: number): Dot | undefined {
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (dot.x === x && dot.y === y) {
        return dot;
      }
    }
    return undefined;
  }

  public printGrid(): void {
    for (let y = 0; y <= this.maxY; y++) {
      let str = '';
      for (let x = 0; x <= this.maxX; x++) {
        const element = this.getDot(Array.from(this.dots.values()), x, y) ? '#' : '.';
        str += element;
      }
      console.info(str);
    }
  }

  public fold(): void {
    const fold = this.folds.splice(0, 1)[0];

    const uniqueDots: Dot[] = [];
    this.dots.forEach((dot: Dot) => {
      if (fold.isX) {
        if (dot.x > fold.value) {
          dot.x = fold.value - (dot.x - fold.value);
        }
      } else {
        if (dot.y > fold.value) {
          dot.y = fold.value - (dot.y - fold.value);
        }
      }

      if (!this.getDot(uniqueDots, dot.x, dot.y)) {
        uniqueDots.push(dot);
      }
    });

    this.dots = uniqueDots;
  }
}
