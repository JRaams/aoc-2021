import CalendarDay from '../calendarDay';

export default class Day10 extends CalendarDay {
  public solveA(): number {
    const lines = this.lines;

    const illegalChars = lines.map(this.getFirstIllegalChar);
    const illegalCharScoreSum = this.getTotalCharScores(illegalChars);

    return illegalCharScoreSum;
  }

  getFirstIllegalChar(line: string): string | undefined {
    const bracketOpen = ['(', '[', '{', '<'];
    const bracketClose = [')', ']', '}', '>'];
    const stack = [];

    for (const char of line) {
      // Opening element
      if (bracketOpen.includes(char)) {
        stack.push(char);
        continue;
      }

      // Not an opening element AND the stack is empty (nonsense)
      if (stack.length === 0) {
        return undefined;
      }

      const top = stack.pop();

      if (char === ')') {
        if (top !== '(') {
          return ')';
        }
      } else if (char === '}') {
        if (top !== '{') {
          return '}';
        }
      } else if (char === ']') {
        if (top !== '[') {
          return ']';
        }
      } else if (char === '>') {
        if (top !== '<') {
          return '>';
        }
      }
    }

    return undefined;
    // return stack.length === 0;
  }

  getTotalCharScores(chars: (string | undefined)[]): number {
    let result = 0;

    chars.forEach((char: string | undefined) => {
      if (char === undefined) {
        return;
      } else if (char === ')') {
        result += 3;
      } else if (char === ']') {
        result += 57;
      } else if (char === '}') {
        result += 1197;
      } else if (char === '>') {
        result += 25137;
      }
    });

    return result;
  }

  public solveB(): number {
    return 10.2;
  }
}
