import * as fs from 'node:fs';

const pruningNumber = BigInt(16777216);

function generateNextSecret(secretNumber: bigint): bigint {
    const step1 = (secretNumber ^ (secretNumber << 6n)) % pruningNumber;
    const step2 = (step1 ^ (step1 >> 5n)) % pruningNumber;
    const step3 = (step2 ^ (step2 << 11n)) % pruningNumber;

    return step3;
}

function main() {
    console.time();
    const input = fs.readFileSync('src/day22/input.txt', 'utf-8');
    const buyers = input.trim().split('\n').map(BigInt);
    let sumSecrets = 0n;

    for (let buyer of buyers) {
        let secret = buyer;
        for (let i = 0; i < 2000; i++) {
            secret = generateNextSecret(secret);
        }
        sumSecrets += secret;
    }

    console.log(sumSecrets.toString());
    console.timeEnd();
}

main();