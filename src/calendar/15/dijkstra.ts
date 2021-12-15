import { priorityQueue } from './priorityqueue';

export interface Node {
  x: number;
  y: number;
  value: number;
}

export class Dijkstra {
  private nodes: Node[];
  private edges: Map<Node, Node[]>;

  constructor(lines: string[]) {
    this.nodes = [];
    this.edges = new Map<Node, Node[]>();

    // Load all nodes from string input
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        const value = Number(line[x]);

        const node: Node = { x, y, value };
        this.nodes.push(node);
        this.edges.set(node, []);
      }
    }

    // Set edges
    this.nodes.forEach((node: Node) => {
      // Try north
      const north = this.findNode(node.x, node.y - 1);
      if (north) this.edges.get(node)?.push(north);

      // Try east
      const east = this.findNode(node.x + 1, node.y);
      if (east) this.edges.get(node)?.push(east);

      // Try south
      const south = this.findNode(node.x, node.y + 1);
      if (south) this.edges.get(node)?.push(south);

      // Try west
      const west = this.findNode(node.x - 1, node.y);
      if (west) this.edges.get(node)?.push(west);
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

  public getDistances(startNode: Node): Map<Node, number> {
    const distances = new Map<Node, number>();

    // Create reference back to previous nodes
    const previous = new Map<Node, Node | null>();
    const pq = priorityQueue<Node>();

    // Set distances to all nodes except start to infinite
    this.nodes.forEach((node: Node) => {
      distances.set(node, Infinity);
      previous.set(node, null);
      pq.insert(node, Infinity);
    });
    distances.set(startNode, 0);
    pq.insert(startNode, 0);

    while (!pq.isEmpty()) {
      const currentNode = pq.pop() as Node;
      const currentWeight: number = distances.get(currentNode)!;

      this.edges.get(currentNode)?.forEach((neighbour: Node) => {
        const neighbourWeight = distances.get(neighbour)!;

        const alt = currentWeight + neighbour.value;
        if (alt < neighbourWeight) {
          distances.set(neighbour, alt);
          previous.set(neighbour, currentNode);
          pq.insert(neighbour, alt);
        }
      });
    }

    return distances;
  }
}
