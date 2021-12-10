import CalendarDay from '../calendarDay';

export default class Day10 extends CalendarDay {
  charScoresA = new Map([
    ['', 0],
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
  ]);

  charScoresB = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4],
  ]);

  public solveA(): number {
    const lines = this.lines;

    const illegalChars = lines.map(this.getFirstIllegalChar);
    const result = illegalChars.reduce((total, current) => total + this.charScoresA.get(current)!, 0);

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
        if (char === bracketClose[i] && top !== bracketOpen[i]) {
          return char;
        }
      }
    }

    return '';
  }

  public solveB(): number {
    const lines = this.lines;
    const lineResults: number[] = [];

    const incompleteLines = lines.filter((line) => this.getFirstIllegalChar(line) === '');
    incompleteLines.forEach((line: string) => {
      const bracketOpen = ['(', '[', '{', '<'];
      const bracketClose = [')', ']', '}', '>'];
      const stack = [];

      for (const char of line) {
        if (bracketOpen.includes(char)) {
          stack.push(char);
          continue;
        }
        stack.pop();
      }

      let lineResult = 0;
      for (let index = stack.length - 1; index >= 0; index--) {
        const char = stack[index];
        const bracketIndex = bracketOpen.findIndex((c) => c === char);
        const closingBracket = bracketClose[bracketIndex];

        lineResult *= 5;
        lineResult += this.charScoresB.get(closingBracket)!;
      }

      lineResults.push(lineResult);
    });

    // the winner is found by sorting all of the scores and then taking the middle score.
    lineResults.sort((a, b) => b - a);
    const winner = lineResults[Math.floor(lineResults.length / 2)];
    return winner;
  }
}
