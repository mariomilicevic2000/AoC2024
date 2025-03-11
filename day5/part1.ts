import * as fs from 'fs'

function checkIsValidUpdate(update : number[], beforeAfter : Map<number, number[]>) : boolean{
    let flag = true;

    for(const num of update){
        const valuesAfter = update.slice(update.indexOf(num) + 1);
        let afters = beforeAfter.get(num);

        for(const val of valuesAfter){
            if(!(afters?.includes(val))){
                flag = false;
                return flag;
            }
        }
    }
    return flag;
}

function main(){
    console.time();
    const input : string = fs.readFileSync('src/day5/input.txt', 'utf-8');
    const rows : string[] = input.split('\n').map(line => line.trim());

    let beforeAfter = new Map<number, number[]>();
    const updates : number[][] = [];
    let isSecondSection = false;
    let tally = 0;

    for(const row of rows){
        if(row === ''){
            isSecondSection = true;
            continue;
        }
        if(!isSecondSection){
            const [left, right] = row.split('|').map(Number);
            if(beforeAfter.has(left)){
                beforeAfter.get(left)!.push(right);
            } else {
                beforeAfter.set(left, [right]);
            }
        } else {
            updates.push(row.split(',').map(Number));
        }
    }

    for(const update of updates){
        let isValidUpdate : boolean = checkIsValidUpdate(update, beforeAfter);
        if(isValidUpdate){
            let middleElement = update[Math.floor((update.length - 1 ) / 2)];
            tally += middleElement;
        }
    }

    console.log(tally);
    console.timeEnd();
}

main();