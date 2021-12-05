import CalendarDay from '../calendarDay';

export default class Day2 extends CalendarDay {
  commandToPos: any = {
    forward: { x: 1, y: 0 },
    down: { x: 0, y: -1 },
    up: { x: 0, y: 1 },
  };

  public solveA(): number {
    let xSum = 0;
    let ySum = 0;

    this.lines.forEach((line) => {
      const { x, y } = this.lineToXY(line);
      xSum += x;
      ySum -= y;
    });

    return xSum * ySum;
  }

  public solveB(): number {
    let xSum = 0;
    let ySum = 0;
    let aim = 0;

    this.lines.forEach((line: string) => {
      const [command, valueStr] = line.split(' ');
      const value = Number(valueStr);

      if (command === 'down') {
        aim -= value;
      } else if (command === 'up') {
        aim += value;
      } else if (command === 'forward') {
        xSum += value;
        ySum -= aim * value;
      }
    });

    return xSum * ySum;
  }

  lineToXY(line: string) {
    const [command, value] = line.split(' ');
    const { x, y } = this.commandToPos[command];
    return { x: x * Number(value), y: y * Number(value) };
  }
}
