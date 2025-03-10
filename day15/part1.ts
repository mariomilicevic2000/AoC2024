import * as fs from 'fs';

function parseInput(input : string) : [string[][], string[]]{
    const lines = input.trim().split('\n');
  
    // Identify where the warehouse grid ends
    let warehouseEndIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      // Look for the last line with '#' characters (walls)
      if (lines[i].includes('#')) {
        warehouseEndIndex = i;
      }
    }
    
    // Parse the warehouse grid (all lines up to and including warehouseEndIndex)
    const warehouseLines = lines.slice(0, warehouseEndIndex + 1);
    const warehouse: string[][] = warehouseLines.map(line => line.split(''));
    
    // Parse the moves (all remaining lines)
    // First, join all remaining lines, then remove whitespace, then split into characters
    const movesText = lines.slice(warehouseEndIndex + 1).join('').replace(/\s+/g, '');
    const moves: string[] = movesText.split('');
    
    return [ warehouse, moves ];
}

const directionMap: Record<string, [number, number]> = {
    '>': [0, 1],   // Move right (increase column)
    '<': [0, -1],  // Move left (decrease column)
    '^': [-1, 0],  // Move up (decrease row)
    'v': [1, 0]    // Move down (increase row)
  };

function main(){
    console.time();
    const input = fs.readFileSync('src/day15/input.txt', 'utf-8');
    const [warehouse, moves] = parseInput(input);

    let robotPosition : [number, number] = [0, 0];

    for(let i = 0; i < warehouse.length; i++){
        for(let j = 0; j < warehouse[0].length; j++){
            if(warehouse[i][j] === '@'){
                robotPosition = [i, j];
                break;
            }
        }
    }

    console.log(robotPosition);

    for(const move of moves){
        const [di, dj] = directionMap[move];
        let i = robotPosition[0] + di;
        let j = robotPosition[1] + dj;
        let boxCount = 0;

        while(warehouse[i][j] === 'O'){
            boxCount++;
            i += di;
            j += dj;
        }

        if(warehouse[i][j] === '.'){
            warehouse[robotPosition[0]][robotPosition[1]] = '.';
            for(let k = boxCount; k > 0; k--){
                const fromRow = robotPosition[0] + di * k;
                const fromCol = robotPosition[1] + dj * k;
                const toRow = robotPosition[0] + di * (k + 1);
                const toCol = robotPosition[1] + dj * (k + 1);
                warehouse[toRow][toCol] = "O";
                warehouse[fromRow][fromCol] = '.';
            }

            robotPosition[0] += di;
            robotPosition[1] += dj;
            warehouse[robotPosition[0]][robotPosition[1]] = "@";
        }
    }

    let score = 0;

    for(let i = 0; i < warehouse.length; i++){
        for(let j = 0; j < warehouse[0].length; j++){
            if(warehouse[i][j] === 'O'){
                let locScore = 100 * i + j;
                score += locScore;
            }
        }
    }

    console.log(score);
    //console.log(warehouse);
    console.timeEnd();
}

main();