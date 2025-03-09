import * as fs from 'fs';

interface Machine {
    A : {x : number, y : number};
    B : {x : number, y : number};
    Prize : {x : number, y : number};
}

function parseInput(input : string) : Machine[] {
    let machines : Machine[] = [];

    const sections = input.trim().split(/\n\s*\n/);
    
    machines = sections.map(section => {
        const lines = section.split("\n");

        const [Ax, Ay] = lines[0].match(/-?\d+/g)!.map(Number);
        const [Bx, By] = lines[1].match(/-?\d+/g)!.map(Number);
        const [Px, Py] = lines[2].match(/-?\d+/g)!.map(Number);

        return {
            A : {x : Ax, y : Ay},
            B : {x : Bx, y : By},
            Prize : {x : Px, y : Py}
        };
    });

    return machines;
}

function main(){
    const input = fs.readFileSync('src/day13/input.txt','utf-8');
    const machines : Machine[] = parseInput(input);

    let totalCost = 0;
    
    for(const machine of machines){
        const Ay = machine.A.y;
        const Ax = machine.A.x;

        // machine.A.x *= Ay;
        // machine.B.x *= Ay;
        // machine.Prize.x *= Ay;

        // machine.A.y *= Ax;
        // machine.B.y *= Ax;
        // machine.Prize.y *= Ax;

        const bDiff = (machine.B.x * Ay) - (machine.B.y * Ax);
        const pDiff = (machine.Prize.x * Ay) - (machine.Prize.y *= Ax);

        if(bDiff !== 0 && pDiff !== 0){ //one solution
            const bSolution = pDiff / bDiff;

            if(Number.isInteger(bSolution)){
                const aSolution = (machine.Prize.x - (bSolution * machine.B.x)) / Ax;

                const cost = 3 * aSolution + bSolution;
                totalCost += cost;
            }
        } else { //infinite solutions, in this dataset there are no such cases so I didn't implement it, that would be solved using Extended Euclidean Algorithm
            console.log("Infinite solutions");
            break;
        }
    }

    console.log(totalCost);
}

main();