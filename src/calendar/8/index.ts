import CalendarDay from '../calendarDay';

export default class Day8 extends CalendarDay {
  public solveA(): number {
    let result = 0;

    this.lines.forEach((line: string) => {
      const fourDigitOutputValueStr = line.split(' | ')[1];
      const digitOutputs = fourDigitOutputValueStr.split(' ');
      result += digitOutputs.filter((output) => [2, 3, 4, 7].includes(output.length)).length;
    });

    return result;
  }

  public solveB(): number {
    return 8.2;
  }
}
