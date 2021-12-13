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

  public count(node: string = 'start', visited: string[] = [], doubled: boolean = false) {
    if (node === 'end') return 1;

    let total = 0;

    this.edges.get(node)!.forEach((next: string) => {
      if (next === 'start') return;
      if (visited.includes(next) && doubled) return;

      const nextVisited = node === node.toLowerCase() ? [...visited, node] : visited;
      const nextDoubled = visited.includes(next) ? true : doubled;

      total += this.count(next, nextVisited, nextDoubled);
    });

    return total;
  }
}
