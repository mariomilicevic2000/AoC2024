import * as fs from 'fs';

function main() {
    console.time();

    const input = fs.readFileSync('src/day3/input.txt', 'utf-8');
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
    let tally = 0;
    let enabled = true;

    for (const match of input.matchAll(regex)) {
        if (match[1] && enabled) {
            tally += Number(match[1]) * Number(match[2]);
        } else if (match[0] === "do()") {
            enabled = true;
        } else if (match[0] === "don't()") {
            enabled = false;
        }
    }

    console.log(tally);
    console.timeEnd();
}

main();
