import * as fs from 'fs';

interface Point{
    x : number;
    y : number;
}

interface Queue {
    x : number;
    y : number;
    steps : number;

}

const directions = [
    {x:0, y:1},
    {x:0, y:-1},
    {x:1, y:0},
    {x:-1, y:0}
]

function bfs(start : Point, end : Point, grid : boolean[][]) : number {
    const queue : Queue[] = [{...start, steps : 0}];
    const visited : boolean[][] = Array.from({ length : 71}, () => Array(71).fill(false));

    visited[start.y][start.x] = true;

    while(queue.length > 0){
        const {x, y, steps} = queue.shift()!;
        if(x === end.x && y === end.y){
            return steps;
        }

        for(const {x : dx, y : dy} of directions){
            const newX = x + dx;
            const newY = y + dy;

            if(newX >= 0 && newX < 71 && newY >= 0 && newY < 71 && !grid[newY][newX] && !visited[newY][newX]){
                visited[newY][newX] = true;
                queue.push({x : newX, y : newY, steps : steps + 1});
            }
        }
    }

    return -1;
}

function main(){
    console.time();
    const input = fs.readFileSync('src/day18/input.txt', 'utf-8');
    const points : Point[] = input.split('\n').slice(0, 1024).map(line => {
        const [x, y] = line.split(',').map(Number);
        return {x, y};
    });

    const grid : boolean[][] = Array.from({ length : 71 }, () => Array(71).fill(false));
    points.forEach(({x, y}) => {
        grid[y][x] = true;
    })

    const start = {x: 0, y: 0};
    const end = {x: 70, y: 70}; 

    let shortestPath = bfs(start, end, grid);

    console.log(shortestPath);

    const newPoints : Point[] = input.split('\n').slice(1024).map(line => {
        const [x, y] = line.split(',').map(Number);
        return {x, y};
    });

    for(let i = 0; i < newPoints.length; i++){
        const [x,y] = [newPoints[i].x, newPoints[i].y];
        grid[y][x] = true;

        shortestPath = bfs(start, end, grid);
        if(shortestPath === -1){
            console.log(x + " " + y);
            break;
        }
    }
    console.timeEnd();
}

main();