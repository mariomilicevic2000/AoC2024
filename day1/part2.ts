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

    const rightCountMap : Map<number, number> = new Map();
    for(const num of rightCol){
        rightCountMap.set(num, (rightCountMap.get(num) || 0)+1);
    }

    let totalSimilarity = 0;

    for(const target of leftCol){
        const count = rightCountMap.get(target) || 0;
        totalSimilarity += target * count;
    }

    console.log("The total distance is equal to: " + totalSimilarity);
    console.timeEnd();
}

main();