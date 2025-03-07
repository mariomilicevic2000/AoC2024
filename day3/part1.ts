import * as fs from 'fs';

function main() {
    console.time();

    const input = fs.readFileSync('src/day3/input.txt', 'utf-8');
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let tally = 0;

    for (const match of input.matchAll(regex)) {
        const left = Number(match[1]);
        const right = Number(match[2]);
        tally += left * right;
    }

    console.log("The final tally is: " + tally);
    console.timeEnd();
}

main();
