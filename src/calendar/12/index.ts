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
    const edges: any = {};

    this.lines.forEach((line: string) => {
      const [a, b] = line.split('-');
      edges[a] = [...(edges[a] || []), b];
      edges[b] = [...(edges[b] || []), a];
    });

    return this.count(edges, 'start');
  }

  // Ripped solution because i cba
  private count(edges: any, node: string, visited: string[] = [], doubled: boolean = false) {
    if (node === 'end') {
      return 1;
    }

    let total = 0;

    edges[node].forEach((next: string) => {
      if (next === 'start') return;
      if (visited.includes(next) && doubled) return;
      if (visited.includes(next)) {
        total += this.count(edges, next, node === node.toLowerCase() ? [...visited, node] : visited, true);
      } else {
        total += this.count(edges, next, node === node.toLowerCase() ? [...visited, node] : visited, doubled);
      }
    });

    return total;
  }
}
