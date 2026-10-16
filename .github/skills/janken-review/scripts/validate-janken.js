'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const appPath = path.resolve(__dirname, '../../../../main.js');
const validHands = ['gu', 'choki', 'pa'];
const resultLabels = {
    draw: '\u3042\u3044\u3053',
    win: '\u3042\u306a\u305f\u306e\u52dd\u3061',
    lose: '\u3042\u306a\u305f\u306e\u8ca0\u3051'
};
const expectedResults = {
    gu: { gu: 'draw', choki: 'win', pa: 'lose' },
    choki: { gu: 'lose', choki: 'draw', pa: 'win' },
    pa: { gu: 'win', choki: 'lose', pa: 'draw' }
};

function evaluate(context, expression) {
    return vm.runInContext(expression, context, { timeout: 1000 });
}

function validateResults(context) {
    let passed = 0;
    for (const playerHand of validHands) {
        for (const computerHand of validHands) {
            const expected = resultLabels[expectedResults[playerHand][computerHand]];
            const label = `${playerHand} vs ${computerHand}`;
            try {
                const actual = evaluate(context,
                    `determineResult(${JSON.stringify(playerHand)}, ${JSON.stringify(computerHand)})`);
                if (actual === expected) {
                    passed += 1;
                    console.log(`PASS ${label}: ${JSON.stringify(actual)}`);
                } else {
                    console.error(`FAIL ${label}: expected ${JSON.stringify(expected)}, actual ${JSON.stringify(actual)}`);
                }
            } catch (error) {
                console.error(`FAIL ${label}: ${error.message}`);
            }
        }
    }
    console.log(`${passed} / 9 tests passed`);
    return passed === 9;
}

function validateComputerHand(context) {
    const samples = [
        { random: 0, expected: 'gu' },
        { random: 1 / 3, expected: 'choki' },
        { random: 2 / 3, expected: 'pa' },
        { random: 1 - Number.EPSILON, expected: 'pa' }
    ];
    let passed = 0;
    const originalRandom = context.Math.random;
    try {
        for (const sample of samples) {
            context.Math.random = () => sample.random;
            try {
                const actual = evaluate(context, 'getRandomHand()');
                if (actual === sample.expected) {
                    passed += 1;
                    console.log(`PASS Math.random=${sample.random}: ${JSON.stringify(actual)}`);
                } else {
                    console.error(`FAIL Math.random=${sample.random}: expected ${JSON.stringify(sample.expected)}, actual ${JSON.stringify(actual)}`);
                }
            } catch (error) {
                console.error(`FAIL Math.random=${sample.random}: ${error.message}`);
            }
        }
    } finally {
        context.Math.random = originalRandom;
    }
    console.log(`${passed} / ${samples.length} computer-hand checks passed`);
    return passed === samples.length;
}

function main() {
    console.log('JANKEN SKILL VALIDATOR v1.0');
    const options = process.argv.slice(2);
    if (options.some(option => option !== '--check-computer-hand')) {
        console.error('Usage: node validate-janken.js [--check-computer-hand]');
        process.exitCode = 2;
        return;
    }
    try {
        const source = fs.readFileSync(appPath, 'utf8');
        const context = vm.createContext({ Math: Object.create(Math) });
        vm.runInContext(source, context, { filename: appPath, timeout: 1000 });
        console.log(`Source: ${appPath}`);
        const resultsPassed = validateResults(context);
        let computerHandPassed = true;
        if (options.includes('--check-computer-hand')) {
            computerHandPassed = validateComputerHand(context);
        } else {
            console.log('Computer-hand selection: NOT CHECKED (use --check-computer-hand)');
        }
        process.exitCode = resultsPassed && computerHandPassed ? 0 : 1;
    } catch (error) {
        console.error(`ERROR ${appPath}: ${error.message}`);
        process.exitCode = 1;
    }
}
main();
