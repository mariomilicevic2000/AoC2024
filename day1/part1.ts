import * as fs from 'fs';

function main() {
    console.time();
    const input : string = fs.readFileSync('src/day1/input.txt', 'utf-8');
    const rows : string[] = input.split('\n').filter(row => row.trim() !== '');
    
    const leftCol : number[] = [];
    const rightCol : number[] = [];
    
    for (const row of rows){
        const [left, right] = row.split(/\s+/).map(Number);
        leftCol.push(left);
        rightCol.push(right);
    }
    
    leftCol.sort();
    rightCol.sort();

    let totalDistance : number = 0;

    for(let i = 0; i < leftCol.length; i++){
        totalDistance += Math.abs(leftCol[i] - rightCol[i]);;
    }

    console.log(`The total distance is: ${totalDistance}`);
    console.timeEnd();
}

main();