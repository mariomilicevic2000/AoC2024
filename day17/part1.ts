import * as fs from 'fs';

interface Registers{
    a : number;
    b : number;
    c : number;
}

function parseInput(input : string) : [Registers, number[]]{
    const nums = input.match(/\d+/g);
    let regs : Registers = {a : 0, b : 0, c : 0};
    const ops : number[] = [];

    if(nums && nums.length >= 3){
        regs = {
            a : parseInt(nums[0], 10),
            b : parseInt(nums[1], 10),
            c : parseInt(nums[2], 10),
        }

        for(let i = 3; i < nums.length; i++){
            ops.push(parseInt(nums[i]));
        }
    }
    
    return [regs, ops];
}

function getComboValue(regs : Registers, operand : number) : number {
    return operand <= 3 ? operand : operand === 4 ? regs.a : operand === 5 ? regs.b : regs.c;
}

function executeCommand(regs: Registers, operation : number, operand : number, output : number[]) : [Registers, number, number[]] {
    let jump = 2;

    switch(operation){
        case 0:
            regs = adv(regs, operand);
            break;
        case 1:
            regs = bxl(regs, operand);
            break;
        case 2:
            regs = bst(regs, operand);
            break;
        case 3:
            jump = jnz(regs, operand);
            break;
        case 4:
            regs = bxc(regs, operand);
            break;
        case 5:
            output.push(out(regs, operand));
            break;
        case 6:
            regs = bdv(regs, operand);
            break;
        case 7:
            regs = cdv(regs, operand);
            break;
        default:
            throw new Error("WTF");
    }

    return [regs, jump, output];
}


function adv(regs : Registers, operand : number) : Registers{ //division
    const numerator : number = regs.a;
    const denominator : number = 2**(getComboValue(regs, operand));
    
    const result = Math.trunc((numerator/denominator));
    regs.a = result;

    return regs;
}

function bxl(regs : Registers, operand : number) : Registers{ //bitwise XOR
    const op1 = regs.b;

    const xor = op1 ^ operand;
    regs.b = xor;

    return regs;
}

function bst(regs : Registers, operand : number) : Registers{ //modulo 8
    const mod = (getComboValue(regs, operand)) % 8;
    regs.b = mod;

    return regs;
}

function jnz(regs : Registers, operand : number) : number{
    let jump = 2;

    if(regs.a !== 0){
        jump = operand;
    }

    return jump;
}

function bxc(regs : Registers, operand : number) : Registers{
    const xor = regs.b ^ regs.c;

    regs.b = xor;

    return regs;
}

function out(regs : Registers, operand : number) : number{
    const mod = getComboValue(regs, operand) % 8;
    const output = mod;

    return output;
}

function bdv(regs : Registers, operand : number) : Registers{
    const numerator : number = regs.a;
    const denominator : number = 2**(getComboValue(regs, operand));
    
    const result = Math.trunc((numerator/denominator));
    regs.b = result;

    return regs;
}

function cdv(regs : Registers, operand : number) : Registers{
    const numerator : number = regs.a;
    const denominator : number = 2**(getComboValue(regs, operand));
    
    const result = Math.trunc((numerator/denominator));
    regs.c = result;

    return regs;
}

function main(){
    const input = fs.readFileSync('src/day17/input.txt', 'utf-8');
    let [registers, operations] = parseInput(input);
    
    let instructionPointer = 0;
    let output : number[] = [];

    while(instructionPointer < operations.length - 1){
        const operation = operations[instructionPointer];
        const operand = operations[instructionPointer+1];

        let jump : number;
        [registers, jump, output] = executeCommand(registers, operation, operand, output);

        if(operation === 3 && registers.a !== 0){
            instructionPointer = operand;
        } else {
            instructionPointer += jump;
        }
    }

    let solution : string = output.join(',');

    console.log(solution);
}

main();