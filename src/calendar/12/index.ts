import CalendarDay from '../calendarDay';
import Graph from './graph';

export default class Day12 extends CalendarDay {
  getPathsBetween(
    start: string,
    end: string,
    edges: Map<string, string[]>,
    visited: Map<string, boolean>,
    currentPath: string[],
    paths: string[][],
  ): void {
    if (visited.get(start) === true) {
      return;
    }

    visited.set(start, true);
    currentPath.push(start);

    if (start === end) {
      paths.push(currentPath);
      visited.set(start, false);
      currentPath.pop();
      return;
    }

    edges.get(start)!.forEach((neighbour) => {
      this.getPathsBetween(neighbour, end, edges, visited, currentPath, paths);
    });

    currentPath.pop();
    visited.set(start, false);
  }

  public solveA(): number {
    const graph = new Graph();

    // TODO: Cleanup
    // Load all vertices and create list of edges
    this.lines.forEach((line: string) => {
      const [cave1, cave2] = line.split('-');
      graph.addVertex(cave1);
      graph.addVertex(cave2);
    });
    // Load all vertices and create list of edges
    this.lines.forEach((line: string) => {
      const [cave1, cave2] = line.split('-');
      graph.addEdge(cave1, cave2);
    });

    graph.DFS('start', 'end');
    return graph.pathCount;
  }

  public solveB(): number {
    return 12.2;
  }
}
