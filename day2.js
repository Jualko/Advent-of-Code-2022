const fs = require('fs');
const aStrategyGuide = fs.readFileSync('day2input.txt', 'utf8').split("\r\n").map(e => e.split(" "));

function calculateScore(mPoints) {
    return aStrategyGuide.reduce((a, c) => a + mPoints[c[0] + c[1]], 0);
}

//Part 1: What would your total score be if everything goes exactly according to your strategy guide?

console.log("Part 1: " + calculateScore({
    "AX": 3 + 1,
    "AY": 6 + 2,
    "AZ": 0 + 3,
    "BX": 0 + 1,
    "BY": 3 + 2,
    "BZ": 6 + 3,
    "CX": 6 + 1,
    "CY": 0 + 2,
    "CZ": 3 + 3
}));

//Part 2: Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

console.log("Part 2: " +calculateScore({
    "AX": 0 + 3,
    "AY": 3 + 1,
    "AZ": 6 + 2,
    "BX": 0 + 1,
    "BY": 3 + 2,
    "BZ": 6 + 3,
    "CX": 0 + 2,
    "CY": 3 + 3,
    "CZ": 6 + 1
}));