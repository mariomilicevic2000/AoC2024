import * as fs from 'fs';

function parseWireLines(wireLines : string[]): Map<string, 0|1>{
    const wires = new Map<string, 0|1>();
    const regex = /([a-zA-Z0-9]{3}):\s(0|1{1})/m;

    for(const line of wireLines){
        const match = regex.exec(line);
        if(match){
            wires.set(match[1], Number(match[2]) as 0 | 1);
        }
    }
    return wires;
}

interface Instruction {
    executed : boolean;
    op1 : string;
    operator : string;
    op2 : string;
    store : string;
}

function parseInstructionLines(instructionLines : string[]) : Instruction[]{
    const instructions : Instruction[] = [];
    const regex = /([a-zA-Z0-9]{3})\s([A-Z]{2,})\s([a-zA-Z0-9]{3})\s->\s([a-zA-Z0-9]{3})/m;

    for(const line of instructionLines){
        const match = line.match(regex);
        if(match){
            const newInstruction : Instruction = {executed : false, op1: match[1], operator : match[2], op2 : match[3], store : match[4]};
            instructions.push(newInstruction);
        }
    }
    return instructions;
}

function executeInstructions(instructions : Instruction[], wires : Map<string, 0|1>) : [instructions : Instruction[], wires : Map<string, 0|1>]{
    for(const instruction of instructions){
        if(instruction.executed === false){
            let result : 0|1 = 0;
            const { op1, operator, op2, store,  } = instruction;
            if(wires.has(op1) && wires.has(op2)){
                const o1 = wires.get(op1);
                const o2 = wires.get(op2);
                switch(operator){
                    case "OR":
                        result = o1! || o2!;
                        break;
                    case "AND":
                        result = o1! && o2!;
                        break;
                    case "XOR":
                        result = (o1! && !o2!) || (!o1! && o2!) ? 1 : 0;
                        break;
                }
                wires.set(store, result);
                instruction.executed = true;
            }
        }
    }
    return [instructions, wires];
}

function readZBits(wires : Map<string, 0|1>) : number[]{
    const regex = /^z\d{2}$/;
    const matchingKeys = [...wires.keys()].filter(key => regex.test(key)).sort();
    const zBits : number[] = [];

    for(const key of matchingKeys){
        zBits.push(wires.get(key)!);
    }

    return zBits;
}

function convertBinaryToDecimal(zBits : number[]) : number {
    let toDecimal = 0;

    for(let i = 0; i < zBits.length; i++){
        if(zBits[i] === 1){
            toDecimal += 2**i;
        }
    }

    return toDecimal;
}

function main(){
    console.time();
    const input = fs.readFileSync('src/day24/input.txt', 'utf-8');
    const lines = input.split('\n').map(line => line.trim());
    const wireLines : string[] = [];
    const instructionLines : string[] = [];

    let i = 0;
    while(lines[i] !== ''){
        wireLines.push(lines[i]);
        i++;
    }
    i++;
    for(let j = i; j < lines.length; j++){
        instructionLines.push(lines[j]);
    }

    let wires : Map<string, 0|1> = new Map();
    wires = parseWireLines(wireLines);
    let instructions : Instruction[] = parseInstructionLines(instructionLines);

    // console.log("Wires size before first pass: " + wires.size);
    // console.log("Instructions size before first pass: " + instructions.length);

    while (instructions.some(inst => !inst.executed)) {
        [instructions, wires] = executeInstructions(instructions, wires);
        instructions = instructions.filter(inst => !inst.executed);
    }

    // console.log("Wires size after last pass: " + wires.size);
    // console.log("Instructions size after last pass: " + instructions.length);

    let zBits : number[] = readZBits(wires);
    const toDecimal = convertBinaryToDecimal(zBits);
    console.log(toDecimal);
    console.timeEnd();

}

main();
