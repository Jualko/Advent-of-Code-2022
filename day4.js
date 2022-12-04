const fs = require('fs');
let aPairs = fs.readFileSync('day4input.txt', 'utf8').split("\r\n").map(e => e.split(","));

//Part 1: In how many assignment pairs does one range fully contain the other?

console.log("Part 1: " + aPairs.filter(e => {
    const aA = e[0].split("-").map(e => parseInt(e));
    const aB = e[1].split("-").map(e => parseInt(e));
    return (aA[0] >= aB[0] && aA[1] <= aB[1]) || (aB[0] >= aA[0] && aB[1] <= aA[1]);
}).length);

//Part 2: In how many assignment pairs do the ranges overlap?
aPairs = aPairs.filter(e => {
    const aA = e[0].split("-").map(e => parseInt(e));
    const aB = e[1].split("-").map(e => parseInt(e));
   return (aA[0] >= aB[0] && aA[1] <= aB[1]) || (aB[0] >= aA[0] && aB[1] <= aA[1]) || (aB[0] <= aA[1] && aB[0] >= aA[0]) || (aA[0] <= aB[1] && aA[0] >= aB[0])
})

console.log("Part 2: " + aPairs.length);