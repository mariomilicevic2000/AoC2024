import * as fs from 'fs';

interface Machine {
  A: { x: bigint, y: bigint };
  B: { x: bigint, y: bigint };
  Prize: { x: bigint, y: bigint };
}

function parseInput(input: string): Machine[] {
  return input.trim().split(/\n\s*\n/).map(section => {
    const lines = section.split("\n");

    const [Ax, Ay] = lines[0].match(/-?\d+/g)!.map(BigInt);
    const [Bx, By] = lines[1].match(/-?\d+/g)!.map(BigInt);
    let [Px, Py] = lines[2].match(/-?\d+/g)!.map(BigInt);

    const conversionError = BigInt(10000000000000);
    Px += conversionError;
    Py += conversionError;

    return {
      A: { x: Ax, y: Ay },
      B: { x: Bx, y: By },
      Prize: { x: Px, y: Py }
    };
  });
}

function main() {
  const input = fs.readFileSync('src/day13/input.txt', 'utf-8');
  const machines: Machine[] = parseInput(input);

  let totalCost = BigInt(0);

  for (const machine of machines) {
    // The two equations are:
    // a * (A.x) + b * (B.x) = Prize.x
    // a * (A.y) + b * (B.y) = Prize.y
    //
    // Multiply the first by A.y and the second by A.x, then subtract:
    //   (Prize.x * A.y - Prize.y * A.x) = b * (B.x * A.y - B.y * A.x)
    //
    // Solve for b:
    const denominatorB = machine.B.x * machine.A.y - machine.B.y * machine.A.x;
    const numeratorB = machine.Prize.x * machine.A.y - machine.Prize.y * machine.A.x;
    
    if (denominatorB === BigInt(0)) {
      console.log("Infinite or no solutions for this machine, skipping.");
      continue;
    }
    
    // Check that b is an integer:
    if (numeratorB % denominatorB !== BigInt(0)) {
      console.log("Non-integer b solution, skipping this machine.");
      continue;
    }
    
    const bSolution = numeratorB / denominatorB;

    // Now solve for a using the first equation:
    // a = (Prize.x - b * B.x) / A.x
    const remainder = machine.Prize.x - bSolution * machine.B.x;
    if (remainder % machine.A.x !== BigInt(0)) {
      console.log("Non-integer a solution, skipping this machine.");
      continue;
    }
    
    const aSolution = remainder / machine.A.x;
    
    // Cost function: cost = 3a + b
    const cost = BigInt(3) * aSolution + bSolution;
    totalCost += cost;
  }

  console.log(totalCost.toString());
}

main();
