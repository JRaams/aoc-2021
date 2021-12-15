// Thanks Win Jongeneel, https://itnext.io/priority-queue-in-typescript-6ef23116901

export interface PriorityQueue<T> {
  insert(item: T, priority: number): void;
  peek(): T | null;
  pop(): T | null;
  size(): number;
  isEmpty(): boolean;
}

export const priorityQueue = <T>(): PriorityQueue<T> => {
  const data: [number, T][] = [];

  return {
    insert: (i, p) => data.push([p, i]),

    isEmpty: () => data.length === 0,

    peek: () => (data.length === 0 ? null : data.reduce((min, current) => (current[0] < min[0] ? current : min))[1]),

    pop: () => {
      if (data.length === 0) return null;

      let min = data[0];
      let minIndex = -1;
      data.forEach((item, index) => {
        if (item[0] < min[0]) {
          min = item;
          minIndex = index;
        }
      });

      data.splice(minIndex, 1);
      return min[1];
    },

    size: () => data.length,
  };
};
