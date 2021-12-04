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
    return 4.2;
  }
}
