export default class Graph {
  private vertices = new Set<string>();
  private edges = new Map<string, string[]>();
  private visited = new Map<string, boolean>();
  private currentPath: string[] = [];
  private allPaths: string[][] = [];

  public get pathCount() {
    return this.allPaths.length;
  }

  public addVertex(v: string): void {
    this.vertices.add(v);
    this.edges.set(v, []);
    this.visited.set(v, false);
  }

  public addEdge(edge1: string, edge2: string): void {
    this.edges.get(edge1)!.push(edge2);
    this.edges.get(edge2)!.push(edge1);
  }

  public DFS(start: string, end: string): void {
    if (this.visited.get(start) === true) {
      return;
    }

    if (!this.isUpperCase(start)) {
      this.visited.set(start, true);
    }
    this.currentPath.push(start);

    if (start === end) {
      this.allPaths.push(JSON.parse(JSON.stringify(this.currentPath)));
      this.visited.set(start, false);
      this.currentPath.pop();
      return;
    }

    this.edges.get(start)!.forEach((next) => {
      this.DFS(next, end);
    });

    this.currentPath.pop();
    this.visited.set(start, false);
  }

  private isUpperCase(str: string): boolean {
    return str === str.toUpperCase();
  }
}
