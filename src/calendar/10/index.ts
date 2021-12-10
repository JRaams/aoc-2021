import CalendarDay from '../calendarDay';

export default class Day10 extends CalendarDay {
  public solveA(): number {
    const lines = this.lines;

    lines.forEach((line: string) => {
      const complete = this.isComplete(line);
      console.info(line, complete);
    });
    // this.isComplete('[{()}]');

    return 10.1;
  }

  isComplete(line: string): boolean {
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
        return false;
      }

      const top = stack.pop();

      if (char === ')') {
        if (top !== '(') {
          return false;
        }
      } else if (char === '}') {
        if (top !== '{') {
          return false;
        }
      } else if (char === ']') {
        if (top !== '[') {
          return false;
        }
      } else if (char === '>') {
        if (top !== '<') {
          return false;
        }
      }
    }

    return stack.length === 0;
  }

  public solveB(): number {
    return 10.2;
  }
}
