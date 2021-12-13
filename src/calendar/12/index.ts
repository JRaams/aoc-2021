import CalendarDay from '../calendarDay';
import Graph from './graph';

export default class Day12 extends CalendarDay {
  public solveA(): number {
    const graph = new Graph();

    this.lines.forEach((line: string) => {
      const [cave1, cave2] = line.split('-');
      graph.addEdge(cave1, cave2);
    });

    graph.getPaths('start', 'end');
    return graph.pathCount;
  }

  public solveB(): number {
    const graph = new Graph();

    this.lines.forEach((line: string) => {
      const [cave1, cave2] = line.split('-');
      graph.addEdge(cave1, cave2);
    });

    graph.getPaths('start', 'end', 2);
    return graph.pathCount;
  }
}
