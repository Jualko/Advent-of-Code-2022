const fs = require('fs');
const mPoints = {
    "X" : 1, //rock
    "Y" : 2, //paper
    "Z" : 3, //scissors
    "AX" : 3,
    "AY" : 6,
    "AZ" : 0,
    "BX" : 0,
    "BY" : 3,
    "BZ" : 6,
    "CX" : 6,
    "CY" : 0,
    "CZ" : 3
}
const aStrategyGuide = fs.readFileSync('day2input.txt', 'utf8').split("\r\n").map(e => e.split(" "));

let points = 0;

aStrategyGuide.forEach(e => {
    points += mPoints[e[1]] + (mPoints[e[0] + e[1]]);
});

console.log(points);

// *** Part 2 ***

const mPoints2 = {
    //A rock, B paper, C scissors, X lose, Y draw, Z win
    "AX" : 0+3,
    "AY" : 3+1,
    "AZ" : 6+2,
    "BX" : 0+1,
    "BY" : 3+2,
    "BZ" : 6+3,
    "CX" : 0+2,
    "CY" : 3+3,
    "CZ" : 6+1
}

points = 0;

aStrategyGuide.forEach(e => {
    points += mPoints2[e[0] + e[1]];
});

console.log(points);