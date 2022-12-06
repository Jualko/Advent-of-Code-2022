const fs = require('fs');
const aInput = fs.readFileSync('day1input.txt', 'utf8').split("\r\n").map(e => parseInt(e) || 0);

//Part 1: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

let aElves = [0];
aInput.forEach(i => { i === 0 ? aElves.push(0) : aElves[aElves.length - 1] += i; });
aElves.sort((a, b) => a - b);

console.log("Part 1: " + aElves[aElves.length - 1]);

//Part 2: Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

console.log("Part 2: " + aElves.slice(aElves.length - 3, aElves.length).reduce((a, b) => a + b));