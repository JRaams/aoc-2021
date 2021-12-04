export interface BoardCell {
  value: number;
  isDrawn: boolean;
}

export class Board {
  private values: BoardCell[][] = [];

  constructor(inputLines: string[]) {
    for (let y = 0; y < inputLines.length; y++) {
      const line = inputLines[y].split(' ');
      if (this.values[y] === undefined) {
        this.values[y] = [];
      }

      for (let x = 0; x < line.length; x++) {
        if (line[x] === '') continue;
        const number = Number(line[x]);
        this.values[y].push({ value: number, isDrawn: false });
      }
    }
  }

  /**
   * @param num the number to draw
   */
  public tryDrawNumber(num: number): void {
    for (let y = 0; y < this.values.length; y++) {
      const row = this.values[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x].value === num) {
          row[x].isDrawn = true;
          break;
        }
      }
    }
  }

  /**
   * @returns Whether the board has bingo
   */
  public hasBingo(): boolean {
    // Check bingo for rows
    for (let y = 0; y < this.values.length; y++) {
      const row = this.values[y];

      if (row.every((col) => col.isDrawn)) {
        return true;
      }
    }

    // Check bingo for cols
    for (let x = 0; x < this.values[0].length; x++) {
      if (this.values.every((row) => row[x].isDrawn)) {
        return true;
      }
    }

    return false;
  }

  /**
   * @returns The sum of values from all cells that have not been drawn
   */
  public sumOfUnmarked(): number {
    let sum = 0;

    this.values.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isDrawn) {
          sum += cell.value;
        }
      });
    });

    return sum;
  }
}

export class BingoSystem {
  private numbers: number[];
  public boards: Board[];

  constructor(input: string[]) {
    // Get numbers
    this.numbers = input[0].split(',').map(Number);
    input.splice(0, 2);

    // Create boards
    this.boards = [];
    while (input.length > 0) {
      this.boards.push(new Board(input.splice(0, 5)));
      input.splice(0, 1);
    }
  }

  /**
   * @returns the number that was drawn
   */
  public draw(): number {
    const num = this.numbers.splice(0, 1)[0];
    this.boards.forEach((board) => board.tryDrawNumber(num));
    return num;
  }

  /**
   * @returns The winning board if applicable, else undefined
   */
  public checkWinner(): Board | undefined {
    let result: Board | undefined;

    this.boards.forEach((board) => {
      if (board.hasBingo()) {
        result = board;
      }
    });

    return result;
  }
}
