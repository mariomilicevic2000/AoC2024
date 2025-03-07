import * as fs from 'fs';

function isSafe(report: number[]): boolean {
    const isIncreasing = report.every((val, i) => i === 0 || val >= report[i - 1]);
    const isDecreasing = report.every((val, i) => i === 0 || val <= report[i - 1]);

    if (!isIncreasing && !isDecreasing) {
        return false;
    }

    for (let i = 0; i < report.length - 1; i++) {
        const diff = Math.abs(report[i + 1] - report[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function main() {
    console.time();
    const input: string = fs.readFileSync('src/day2/input.txt', 'utf-8');
    const rows: string[] = input.split('\n').filter(row => row.trim() !== '');
    let safeReports = 0;

    for (const row of rows) {
        const report = row.trim().split(/\s+/).map(Number);

        if (isSafe(report)) {
            safeReports++;
            continue;
        }

        // Try removing each level and check if it becomes safe
        let foundValid = false;
        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report.slice(0, i).concat(report.slice(i + 1)); // Remove one level
            if (isSafe(modifiedReport)) {
                foundValid = true;
                break;
            }
        }

        if (foundValid) {
            safeReports++;
        }
    }

    console.log(`There are ${safeReports} safe reports.`);
    console.timeEnd();
}

main();
