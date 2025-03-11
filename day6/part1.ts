import * as fs from 'fs';

const directions: { [key: string]: [number, number, string] } = {
    '^': [-1, 0, '^'],
    '>': [0, 1, '>'],
    '<': [0, -1, '<'],
    'v': [1, 0, 'v']
};

function getInitialPosition(rows: string[][]): [number, number, string] | undefined {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[0].length; j++) {
            if (rows[i][j] in directions) {
                return [i, j, rows[i][j]];
            }
        }
    }
}

function moveGuard(rows: string[][], x: number, y: number, orientation: string, xDim: number, yDim: number): [number, number, boolean, boolean] {
    let possible = true;

    const [dx, dy, newOrientation] = directions[orientation];
    const newX = x + dx;
    const newY = y + dy;

    let outOfBounds: boolean = false;

    if (checkOutOfBounds(newX, newY, xDim, yDim)) {
        outOfBounds = true;
    }

    if (rows[newX][newY] !== '#') {
        rows[x][y] = 'X';
        x = newX;
        y = newY;
        rows[x][y] = newOrientation;
    } else {
        possible = false;
    }

    return [x, y, possible, outOfBounds];
}

function rotateRight(orientation: string): string {
    const rotations: { [key: string]: string } = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };
    return rotations[orientation];
}

function checkOutOfBounds(x: number, y: number, xDimension: number, yDimension: number): boolean {
    return x < 0 || x >= xDimension || y < 0 || y >= yDimension;
}

function main() {
    console.time();
    const input : string = fs.readFileSync('src/day6/input.txt', 'utf-8');
    let rows : string[][]= input.split('\n').filter(row => row.trim() !== '').map(row => row.split(''));

    let x: number = 0;
    let y: number = 0;
    let orientation: string = "";

    const xDimension = rows.length;
    const yDimension = rows[0].length;

    const position = getInitialPosition(rows);
    if (position) {
        [x, y, orientation] = position;
    } else {
        throw new Error('Initial position not found');
    }

    const visited = new Set<string>([`${x},${y}`]);

    while (true) {
        let [newX, newY, movePossible, outOfBounds] = moveGuard(rows, x, y, orientation, xDimension, yDimension);
        if (outOfBounds) break;
        if (movePossible) {
            x = newX;
            y = newY;
            visited.add(`${x},${y}`);
        } else {
            orientation = rotateRight(orientation);
        }
    }

    console.log(`Distinct positions visited: ${visited.size}`);
    console.timeEnd();
}

main();
