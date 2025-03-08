import * as fs from 'fs'

function main(){
    console.time();
    const input : string = fs.readFileSync('src/day4/input.txt', 'utf-8');
    const grid : string[][] = input.split('\n').map(row => row.split(''));
    const height : number = grid.length;
    const width : number = grid[0].length;
    let found : number = 0;

    const directions = [
        { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }
    ];

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(grid[i][j] === 'X'){
                for(const {x, y} of directions){
                    if(i + 3*x >= 0 && i + 3*x < height && //checks if X has enough room from the border by height
                        j + 3*y >= 0 && j + 3*y < width && //checks if X has enough room from the border by width
                        grid[i + x][j + y] === 'M' && //checks if the letters are there in current iteration of steps by direction
                        grid[i + 2*x][j + 2*y] === 'A' &&
                        grid[i + 3*x][j + 3*y] === 'S'
                    ){
                        found++;
                    }
                }
            }
        }
    }
    
    console.log(found);
    console.timeEnd();
}

main();