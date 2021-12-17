import CalendarDay from '../calendarDay';

interface Coord {
  x: number;
  y: number;
}

interface Area {
  min: Coord;
  max: Coord;
  tiles: Set<Coord>;
}

interface ShotResult {
  hit: boolean;
  highestY: number;
}

export default class Day17 extends CalendarDay {
  public solveA(): number {
    const areaStr = this.lines[0]
      .split('area: ')[1]
      .split(', ')
      .map((s) => s.split('=')[1]);
    const [x1, x2] = areaStr[0].split('..').map(Number);
    const [y1, y2] = areaStr[1].split('..').map(Number);

    const tiles = new Set<Coord>();
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        tiles.add({ x, y });
      }
    }

    const area: Area = {
      min: { x: x1, y: y1 },
      max: { x: x2, y: y2 },
      tiles,
    };
    const result = this.getMaxYValue(area);
    return result.highestY;
  }

  private getMaxYValue(target: Area): any {
    let hits = 0;
    let result = 0;

    // X can be 0 -> target max x
    // Since it needs to be positive to go right, but it cant overshoot it in step 1
    // Y can be target min y -> positive target min y
    for (let vx = 0; vx < target.max.x; vx++) {
      for (let vy = target.min.y; vy < Math.abs(target.min.y); vy++) {
        if (vx === 7 && vy === 2) {
          console.info('a');
        }

        const velocity: Coord = { x: vx, y: vy };
        const { hit, highestY } = this.fire(target, velocity);
        if (hit) {
          if (highestY > result) result = highestY;
          hits++;
        }
      }
    }

    return { highestY: result, hits };
  }

  private fire(target: Area, velocity: Coord): ShotResult {
    const position: Coord = { x: 0, y: 0 };
    let highestY = 0;
    let hit = false;

    while (true) {
      position.x += velocity.x;
      position.y += velocity.y;

      if (position.y > highestY) highestY = position.y;

      velocity.x = velocity.x > 0 ? velocity.x - 1 : velocity.x < 0 ? velocity.x + 1 : velocity.x;
      velocity.y--;

      if (position.x > target.max.x || position.y < target.min.y) {
        break;
      }

      let matchingTile: Coord | undefined;
      target.tiles.forEach((tile: Coord) => {
        if (tile.x === position.x && tile.y === position.y) {
          matchingTile = tile;
        }
      });
      if (matchingTile) {
        hit = true;
        break;
      }
    }

    return { hit, highestY };
  }

  public solveB(): number {
    return 17.2;
  }
}
