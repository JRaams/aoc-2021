export default class Graph {
  private edges = new Map<string, string[]>();

  public addEdge(edge1: string, edge2: string): void {
    this.addVertex(edge1);
    this.addVertex(edge2);

    this.edges.get(edge1)!.push(edge2);
    this.edges.get(edge2)!.push(edge1);
  }

  private addVertex(v: string): void {
    if (this.edges.get(v) === undefined) {
      this.edges.set(v, []);
    }
  }

  public pathCount(doubled: boolean, node: string = 'start', visited: string[] = []) {
    if (node === 'end') return 1;
    if (node === 'start' && visited.includes('start')) return 0;
    let total = 0;

    this.edges.get(node)!.forEach((next: string) => {
      if (visited.includes(next) && doubled) return;

      const nextVisited = node === node.toLowerCase() ? [...visited, node] : visited;
      const nextDoubled = visited.includes(next) ? true : doubled;

      total += this.pathCount(nextDoubled, next, nextVisited);
    });

    return total;
  }
}
