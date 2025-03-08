import * as fs from 'fs'

interface Equation {
    key : number;
    numbers : number[];
}

function parseInput(input : string) : Equation[]{
    const rows : string[] = input.split('\n').map(row => row.trim());

    return rows
    .map(row => {
        const match = row.match(/^(\d+):\s([\d\s]+)$/);
        if (!match) return null;

        const key : number = parseInt(match[1], 10);
        const numbers : number[] = match[2].split(/\s+/).map(Number);

        return { key, numbers };
    })
    .filter((entry): entry is { key: number; numbers: number[] } => entry !== null);
}

function checkReach(key : number, nums : number[]) : boolean{
    let currentResults = new Set<number>([nums[0]]);
    
    for(let i = 1; i < nums.length; i++){
        const nextResults = new Set<number>();
        for(const result of currentResults){
            nextResults.add(result + nums[i]);
            nextResults.add(result * nums[i]);
        }

        currentResults = nextResults;
    }
    return currentResults.has(key);
}

function main(){
    console.time();
    const input : string = fs.readFileSync('src/day7/input.txt','utf-8');
    const parsedData : Equation[] = parseInput(input);
    let calibrationValues = 0;
    
    for(const equation of parsedData){
        const canReachTarget : boolean = checkReach(equation.key, equation.numbers);
        if(canReachTarget){
            calibrationValues = calibrationValues + equation.key;
        }
    }

    console.log(calibrationValues);
    console.timeEnd();
}

main();