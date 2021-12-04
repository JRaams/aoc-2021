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
}

export class BingoSystem {
  private numbers: number[];
  private boards: Board[];

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
}
