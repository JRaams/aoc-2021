import { priorityQueue } from './priorityqueue';

export interface Node {
  idx: number;
  x: number;
  y: number;
  value: number;
}

export class Dijkstra {
  private nodes: Node[];
  // Edges map with node idx -> node idxs
  private edges: Map<number, number[]>;

  constructor() {
    this.nodes = [];
    this.edges = new Map<number, number[]>();
  }

  public addNodesA(lines: string[]) {
    let idx = 0;

    // Load all nodes from string input
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        const value = Number(line[x]);

        const node: Node = { idx, x, y, value };
        this.nodes.push(node);
        this.edges.set(idx, []);
        idx++;
      }
    }
  }

  public addNodesB(lines: string[]) {
    let idx = 0;

    // Load all nodes from string input
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];

      for (let i = 0; i < 5; i++) {
        for (let x = 0; x < line.length; x++) {
          const value = Number(line[x]);

          for (let j = 0; j < 5; j++) {
            let newVal = value + i + j;
            if (newVal > 9) {
              newVal %= 9;
            }

            const node: Node = { idx, x: x + j * line.length, y: y + i * line.length, value: newVal };
            this.nodes.push(node);
            this.edges.set(idx, []);
            idx++;
          }
        }
      }
    }
  }

  public setEdges(): void {
    this.nodes.forEach((node: Node) => {
      // Try north
      const north = this.findNode(node.x, node.y - 1);
      if (north) this.edges.get(node.idx)?.push(north.idx);

      // Try east
      const east = this.findNode(node.x + 1, node.y);
      if (east) this.edges.get(node.idx)?.push(east.idx);

      // Try south
      const south = this.findNode(node.x, node.y + 1);
      if (south) this.edges.get(node.idx)?.push(south.idx);

      // Try west
      const west = this.findNode(node.x - 1, node.y);
      if (west) this.edges.get(node.idx)?.push(west.idx);
    });
  }

  public get nodeList() {
    return this.nodes;
  }

  public findNode(x: number, y: number): Node | null {
    for (let index = 0; index < this.nodes.length; index++) {
      const node = this.nodes[index];
      if (node.x === x && node.y === y) {
        return node;
      }
    }
    return null;
  }

  public getDistances(startNode: Node): Map<number, number> {
    const distances = new Map<number, number>();

    // Create reference back to previous nodes
    const previous = new Map<number, number | null>();
    const pq = priorityQueue<number>();

    // Set distances to all nodes except start to infinite
    this.nodes.forEach((node: Node) => {
      distances.set(node.idx, Infinity);
      previous.set(node.idx, null);
      pq.insert(node.idx, Infinity);
    });
    distances.set(startNode.idx, 0);
    pq.insert(startNode.idx, 0);

    while (!pq.isEmpty()) {
      const currentNodeIdx: number = pq.pop()!;
      const currentWeight: number = distances.get(currentNodeIdx)!;

      this.edges.get(currentNodeIdx)?.forEach((neighbourIdx: number) => {
        const neighbourWeight = distances.get(neighbourIdx)!;

        const alt = currentWeight + this.nodes[neighbourIdx].value;
        if (alt < neighbourWeight) {
          distances.set(neighbourIdx, alt);
          previous.set(neighbourIdx, currentNodeIdx);
          pq.insert(neighbourIdx, alt);
        }
      });
    }

    return distances;
  }
}
