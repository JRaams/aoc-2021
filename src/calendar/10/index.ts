import CalendarDay from '../calendarDay';

export default class Day10 extends CalendarDay {
  charScores = new Map([
    ['', 0],
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
  ]);

  public solveA(): number {
    const lines = this.lines;

    const illegalChars = lines.map(this.getFirstIllegalChar);
    const result = illegalChars.reduce((total, current) => total + this.charScores.get(current)!, 0);

    return result;
  }

  getFirstIllegalChar(line: string): string {
    const bracketOpen = ['(', '[', '{', '<'];
    const bracketClose = [')', ']', '}', '>'];
    const stack = [];

    for (const char of line) {
      // Push opening bracket to stack
      if (bracketOpen.includes(char)) {
        stack.push(char);
        continue;
      }

      // Pop last item from stack, make sure it matches bracket option
      const top = stack.pop();
      for (let i = 0; i < bracketClose.length; i++) {
        const closingChar = bracketClose[i];
        if (char === closingChar && top !== bracketOpen[i]) {
          return char;
        }
      }
    }

    return '';
  }

  public solveB(): number {
    return 10.2;
  }
}
