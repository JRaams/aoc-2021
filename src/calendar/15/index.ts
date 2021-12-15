import CalendarDay from '../calendarDay';
import { Dijkstra } from './dijkstra';

export default class Day15 extends CalendarDay {
  public solveA(): number {
    const dijkstra = new Dijkstra();
    dijkstra.addNodesA(this.lines);
    dijkstra.setEdges();

    const nodes = dijkstra.nodeList;
    const startNode = nodes[0];
    const distances = dijkstra.getDistances(startNode);
    const lastNode = nodes[nodes.length - 1];

    return distances.get(lastNode.idx)!;
  }

  public solveB(): number {
    const dijkstra = new Dijkstra();
    dijkstra.addNodesB(this.lines);
    dijkstra.setEdges();

    const nodes = dijkstra.nodeList;
    const startNode = nodes[0];
    const distances = dijkstra.getDistances(startNode);
    const lastNode = nodes[nodes.length - 1];

    return distances.get(lastNode.idx)!;
  }
}
