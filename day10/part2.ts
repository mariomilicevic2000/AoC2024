import * as fs from 'fs';

interface Node {
    x: number;
    y: number;
    value: number;
    children: Node[];
}

function buildGraph(startX: number, startY: number, grid: number[][]): Node | null {
    const numRows = grid.length;
    const numCols = grid[0].length;

    if (grid[startY][startX] !== 0) {
        return null;
    }

    const memo = new Map<string, Node>();

    function dfs(x: number, y: number): Node {
        const key = `${x},${y}`;
        if (memo.has(key)) return memo.get(key)!;

        const currentValue = grid[y][x];
        const node: Node = { x, y, value: currentValue, children: [] };
        memo.set(key, node);

        if (currentValue === 9) return node;

        const nextValue = currentValue + 1;
        const directions = [
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 },  // Down
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }   // Right
        ];

        for (const { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < numCols && newY >= 0 && newY < numRows) {
                if (grid[newY][newX] === nextValue) {
                    node.children.push(dfs(newX, newY));
                }
            }
        }

        return node;
    }

    return dfs(startX, startY);
}

function countDistinctPaths(node: Node, memo: Map<string, number>): number {
    const key = `${node.x},${node.y}`;
    if (memo.has(key)) return memo.get(key)!;

    if (node.children.length === 0) {
        return 1; // Ako nema djece, znači da je ovo završna točka
    }

    let totalPaths = 0;
    for (const child of node.children) {
        totalPaths += countDistinctPaths(child, memo);
    }

    memo.set(key, totalPaths);
    return totalPaths;
}

function main() {
    console.time();
    const input = fs.readFileSync('src/day10/input.txt', 'utf-8');
    const grid = input.split('\n').map(row => row.trim().split('').map(Number));
    const height = grid.length;
    const width = grid[0].length;

    const graphs: Node[] = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 0) {
                const graph = buildGraph(j, i, grid);
                if (graph) {
                    graphs.push(graph);
                }
            }
        }
    }

    let totalRating = 0;
    for (const graph of graphs) {
        const memo = new Map<string, number>();
        totalRating += countDistinctPaths(graph, memo);
    }

    console.log(totalRating);
    console.timeEnd();
}

main();
