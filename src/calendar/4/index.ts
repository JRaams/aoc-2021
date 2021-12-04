import CalendarDay from '../calendarDay';
import { BingoSystem, Board } from './bingoSystem';

export default class Day4 extends CalendarDay {
  public solveA(): number {
    const bingoSystem = new BingoSystem(this.lines);

    let winningBoard: Board | null = null;
    while (!winningBoard) {
      bingoSystem.draw();
      winningBoard = bingoSystem.checkWinner();
    }

    return winningBoard.sumOfUnmarked() * bingoSystem.lastNumber;
  }

  public solveB(): number {
    const bingoSystem = new BingoSystem(this.lines);

    let sum = 0;

    let winningBoard: Board | null = null;
    while (bingoSystem.boards.length > 0) {
      bingoSystem.draw();
      winningBoard = bingoSystem.checkWinner();
      while (winningBoard) {
        sum = winningBoard.sumOfUnmarked();
        bingoSystem.boards = bingoSystem.boards.filter((b) => b !== winningBoard);
        winningBoard = bingoSystem.checkWinner();
      }
    }

    return sum * bingoSystem.lastNumber;
  }
}
