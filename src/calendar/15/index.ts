import CalendarDay from '../calendarDay';
import { Dijkstra, Node } from './dijkstra';

export default class Day15 extends CalendarDay {
  public solveA(): number {
    const dijkstra = new Dijkstra(this.lines);
    const startNode = dijkstra.findNode(0, 0) as Node;
    const distances = dijkstra.getDistances(startNode);
    const lastNode = dijkstra.nodeList[dijkstra.nodeList.length - 1];

    return distances.get(lastNode)!;
  }

  public solveB(): number {
    return 15.2;
  }
}
