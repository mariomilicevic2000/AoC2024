import * as fs from 'fs';

function canFormDesign(design : string, towels : Set<string>, memo : Map<string, boolean>){
    if(design === "") return true;
    if(memo.has(design)) return memo.get(design)!;

    for(const towel of towels){
        if(design.startsWith(towel)){
            if(canFormDesign(design.slice(towel.length), towels, memo)){
                memo.set(design, true);
                return true;
            }
        }
    }

    memo.set(design, false);
    return false;
}

function countPossibleDesigns(patterns : string[], designs : string[]) : number{
    const towels = new Set(patterns);
    let count = 0;

    for(let design of designs){
        design = design.trim();
        if(design && canFormDesign(design, towels, new Map())){
            count++;
        }
    }
    return count;
}

function main(){
    console.time();
    const input = fs.readFileSync('src/day19/input.txt', 'utf-8');
    const lines = input.split("\n").map(line => line.trim());

    const patterns = lines[0].split(",").map(p => p.trim());
    const emptyLineIndex = lines.indexOf("");
    const designs = lines.slice(emptyLineIndex+1);

    const result = countPossibleDesigns(patterns, designs);
    console.log(result);
    console.timeEnd();
}

main();