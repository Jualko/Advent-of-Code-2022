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