export default class Graph {
  private vertices = new Set<string>();
  private edges = new Map<string, string[]>();
  private currentPath: string[] = [];
  private allPaths: string[][] = [];

  public get pathCount() {
    return this.allPaths.length;
  }

  public addEdge(edge1: string, edge2: string): void {
    this.addVertex(edge1);
    this.addVertex(edge2);

    this.edges.get(edge1)!.push(edge2);
    this.edges.get(edge2)!.push(edge1);
  }

  private addVertex(v: string): void {
    this.vertices.add(v);
    if (this.edges.get(v) === undefined) {
      this.edges.set(v, []);
    }
  }

  public DFS(start: string, end: string, visited: any = {}): void {
    if (visited[start] === undefined) {
      visited[start] = 0;
    }

    if (!this.isUpperCase(start) && visited[start] === 1) {
      return;
    }

    visited[start]++;
    this.currentPath.push(start);

    if (start === end) {
      this.allPaths.push(JSON.parse(JSON.stringify(this.currentPath)));
      this.currentPath.pop();
      return;
    }

    this.edges.get(start)!.forEach((next) => {
      this.DFS(next, end, JSON.parse(JSON.stringify(visited)));
    });

    this.currentPath.pop();
  }

  private isUpperCase(str: string): boolean {
    return str === str.toUpperCase();
  }
}
