import * as fs from 'node:fs';

const pruningNumber = BigInt(16777216);

function generateNextSecret(secretNumber: bigint): bigint {
    const step1 = (secretNumber ^ (secretNumber << 6n)) % pruningNumber;
    const step2 = (step1 ^ (step1 / 32n)) % pruningNumber;
    const step3 = (step2 ^ (step2 * 2048n)) % pruningNumber;
    return step3;
}

function generateAllPossibleSequences(): number[][] {
    let sequences: number[][] = [];

    for (let a = -9; a < 10; a++) {
        for (let b = -9; b < 10; b++) {
            for (let c = -9; c < 10; c++) {
                for (let d = -9; d < 10; d++) {
                    if(d > a){
                        sequences.push([a, b, c, d]);
                    }
                }
            }
        }
    }

    return sequences;
}

interface PriceEntry {
    price: number;
    change: number;
}

function main() {
    const input = fs.readFileSync('src/day22/input.txt', 'utf-8');
    const buyers = input.trim().split('\n').map(BigInt);

    let allPricesAllBuyers: PriceEntry[][] = buyers.map(() => []);
    
    // Generate all prices and changes for each buyer
    buyers.forEach((buyer, buyerIndex) => {
        let secret = buyer;
        for (let i = 0; i < 2000; i++) {
            secret = generateNextSecret(secret);
            const price = Number(secret) % 10;
            const change = i > 0 ? price - allPricesAllBuyers[buyerIndex][i - 1].price : 0;
            allPricesAllBuyers[buyerIndex].push({ price, change });
        }
    });

    const sequences = generateAllPossibleSequences();
    let maxBananas = 0;
    let bestSequence: number[] = [];

    // Iterate through all possible sequences
    for (const sequence of sequences) {
        let totalBananas = 0;

        for (let buyerPrices of allPricesAllBuyers) {
            for (let j = 0; j <= 2000 - 4; j++) {
                if (
                    buyerPrices[j].change === sequence[0] &&
                    buyerPrices[j + 1].change === sequence[1] &&
                    buyerPrices[j + 2].change === sequence[2] &&
                    buyerPrices[j + 3].change === sequence[3]
                ) {
                    totalBananas += buyerPrices[j + 3].price;
                    break; // Stop checking this buyer, move to the next one
                }
            }
        }

        // Check if this sequence is the best so far
        if (totalBananas > maxBananas) {
            maxBananas = totalBananas;
            bestSequence = sequence;
        }
    }

    console.log("Best Sequence:", bestSequence);
    console.log("Max Bananas:", maxBananas);
}

main();
