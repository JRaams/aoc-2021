interface Coord {
  x: number;
  y: number;
}

interface ShotResult {
  hitTargetArea: boolean;
  highestY: number;
}

interface Result {
  hitCount: number;
  maxY: number;
}

export default class Trench {
  min: Coord;
  max: Coord;
  tiles: Coord[];

  constructor(targetArea: string) {
    const areaStr = targetArea
      .split('area: ')[1]
      .split(', ')
      .map((s) => s.split('=')[1]);
    const [x1, x2] = areaStr[0].split('..').map(Number);
    const [y1, y2] = areaStr[1].split('..').map(Number);

    const tiles: Coord[] = [];
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        tiles.push({ x, y });
      }
    }

    this.min = { x: x1, y: y1 };
    this.max = { x: x2, y: y2 };
    this.tiles = tiles;
  }

  public getHighestProbePosition(): Result {
    let hitCount = 0;
    let maxY = 0;

    for (let vx = 0; vx < this.max.x + 1; vx++) {
      for (let vy = this.min.y; vy < Math.abs(this.min.y); vy++) {
        const velocity: Coord = { x: vx, y: vy };
        const { hitTargetArea, highestY } = this.fire(velocity);

        if (hitTargetArea) {
          hitCount++;
          if (highestY > maxY) {
            maxY = highestY;
          }
        }
      }
    }

    return { hitCount, maxY };
  }

  private fire(velocity: Coord): ShotResult {
    const position: Coord = { x: 0, y: 0 };
    let highestY = 0;
    let hitTargetArea = false;

    while (true) {
      // Update bullet position and calculate new velocity
      position.x += velocity.x;
      position.y += velocity.y;
      // the probe's x velocity decreases by 1 if it is greater than 0 (drag)
      if (velocity.x > 0) {
        velocity.x--;
      }
      velocity.y--;

      // Mark potential highest position
      if (position.y > highestY) {
        highestY = position.y;
      }

      // Check if we already overshot the target area
      if (position.x > this.max.x || position.y < this.min.y) {
        break;
      }

      // Check if we hit the target area
      if (this.tiles.find((t: Coord) => t.x === position.x && t.y === position.y)) {
        hitTargetArea = true;
        break;
      }
    }

    return { hitTargetArea, highestY };
  }
}
