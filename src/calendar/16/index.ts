import CalendarDay from '../calendarDay';
import Packet from './packet';

function hexToBin(hex: string): string {
  return parseInt(hex, 16).toString(2).padStart(4, '0');
}

export default class Day16 extends CalendarDay {
  public solveA(): number {
    const input: string = this.lines[0];
    const inputBits: string[] = input.split('').map(hexToBin).join('').split('');
    const packet = new Packet(inputBits);
    return packet.sumVersionNumbers();
  }

  public solveB(): number {
    return 16.2;
  }
}
