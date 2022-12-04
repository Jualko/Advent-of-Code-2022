const fs = require('fs');
const aPairs = fs.readFileSync('day4input.txt', 'utf8').split("\r\n").map(e => [formatPair(e, 0), formatPair(e, 1)]);

function formatPair(aPair, index) {
    return aPair.split(",")[index].split("-").map(e => parseInt(e));
}

//Part 1: In how many assignment pairs does one range fully contain the other?
function doesContain(aA, aB) {
    return (aA[0] >= aB[0] && aA[1] <= aB[1]) || (aB[0] >= aA[0] && aB[1] <= aA[1]);
}

console.log("Part 1: " + aPairs.filter(e => doesContain(e[0], e[1])).length);

//Part 2: In how many assignment pairs do the ranges overlap?
function doesOverlap(aA, aB) {
    return (aB[0] <= aA[1] && aB[0] >= aA[0]) || (aA[0] <= aB[1] && aA[0] >= aB[0]);
}

console.log("Part 2: " + aPairs.filter(e => doesOverlap(e[0], e[1])).length);