import * as fs from 'node:fs';

const PRUNING_NUMBER = BigInt(16777216);
const NUM_CHANGES = 4;
const NUM_GENERATIONS = 2000;

/**
 * Generates the next secret number based on the given rules.
 */
function generateNextSecret(secretNumber: bigint): bigint {
    const step1 = (secretNumber ^ (secretNumber << 6n)) % PRUNING_NUMBER;
    const step2 = (step1 ^ (step1 / 32n)) % PRUNING_NUMBER;
    const step3 = (step2 ^ (step2 * 2048n)) % PRUNING_NUMBER;
    return step3;
}

/**
 * Generates only valid sequences where the final price is at least as high as the first.
 */
function* generateValidSequences() {
    for (let a = -9; a < 10; a++) {
        for (let b = -9; b < 10; b++) {
            for (let c = -9; c < 10; c++) {
                for (let d = -9; d < 10; d++) {
                    if (d >= a) {  // Optimization: Avoid sequences with negative net gain
                        yield [a, b, c, d];
                    }
                }
            }
        }
    }
}

interface PriceEntry {
    price: number;
    change: number;
}

function main() {
    // Read and parse input
    const input = fs.readFileSync('src/day22/input.txt', 'utf-8');
    const buyers = input.trim().split('\n').map(BigInt);

    let allPricesAllBuyers: PriceEntry[][] = buyers.map(() => []);

    // Generate all prices and changes for each buyer
    buyers.forEach((buyer, buyerIndex) => {
        let secret = buyer;
        for (let i = 0; i < NUM_GENERATIONS; i++) {
            secret = generateNextSecret(secret);
            const price = Number(secret) % 10;
            const change = i > 0 ? price - allPricesAllBuyers[buyerIndex][i - 1].price : 0;
            allPricesAllBuyers[buyerIndex].push({ price, change });
        }
    });

    // Map sequences to the first occurrence price sum
    const sequenceMap = new Map<string, number>();

    buyers.forEach((_, buyerIndex) => {
        for (let j = 0; j <= NUM_GENERATIONS - NUM_CHANGES; j++) {
            const sequence = `${allPricesAllBuyers[buyerIndex][j].change},${allPricesAllBuyers[buyerIndex][j + 1].change},${allPricesAllBuyers[buyerIndex][j + 2].change},${allPricesAllBuyers[buyerIndex][j + 3].change}`;
            const price = allPricesAllBuyers[buyerIndex][j + 3].price;

            if (!sequenceMap.has(sequence)) {
                sequenceMap.set(sequence, 0);
            }
            sequenceMap.set(sequence, sequenceMap.get(sequence)! + price);
            break; // Only count the first occurrence per buyer
        }
    });

    let maxBananas = 0;
    let bestSequence: number[] = [];
    const maxPossibleBananas = 9 * buyers.length;  // Max banana price is 9 per buyer

    // Iterate through only valid sequences
    for (const sequence of generateValidSequences()) {
        const key = sequence.join(',');
        if (sequenceMap.has(key)) {
            const totalBananas = sequenceMap.get(key)!;
            if (totalBananas > maxBananas) {
                maxBananas = totalBananas;
                bestSequence = sequence;

                // Early exit if we reach the best possible score
                if (maxBananas === maxPossibleBananas) {
                    break;
                }
            }
        }
    }

    console.log("Best Sequence:", bestSequence);
    console.log("Total Bananas Collected:", maxBananas);
}

main();
