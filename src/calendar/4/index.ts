import CalendarDay from '../calendarDay';
import { BingoSystem, Board } from './bingoSystem';

export default class Day4 extends CalendarDay {
  public solveA(): number {
    const bingoSystem = new BingoSystem(this.lines);

    let winningBoard: Board | undefined;
    let lastCalledNum = -1;

    while (!winningBoard) {
      lastCalledNum = bingoSystem.draw();
      winningBoard = bingoSystem.checkWinner();
    }

    return winningBoard.sumOfUnmarked() * lastCalledNum;
  }

  public solveB(): number {
    const bingoSystem = new BingoSystem(this.lines);

    let sum = 0;
    let lastCalledNum = -1;

    // Go on until the last board has bingo
    let winningBoard: Board | undefined;
    while (bingoSystem.boards.length > 0) {
      lastCalledNum = bingoSystem.draw();
      winningBoard = bingoSystem.checkWinner();

      // Remove all boards with bingo from the list
      while (winningBoard) {
        sum = winningBoard.sumOfUnmarked();
        bingoSystem.boards = bingoSystem.boards.filter((b) => b !== winningBoard);
        winningBoard = bingoSystem.checkWinner();
      }
    }

    return sum * lastCalledNum;
  }
}
