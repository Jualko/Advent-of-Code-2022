const fs = require('fs');
const aInput = fs.readFileSync('day1input.txt', 'utf8').split("\r\n").map(e => parseInt(e) || 0);

//Part 1: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

let aElves = [];
let iCalories = 0;
for (let i = 0; i < aInput.length; i++) {
    if (aInput[i] === 0 || i === aInput.length - 1) {
        aElves.push(iCalories);
        iCalories = 0;
    } else {
        iCalories += aInput[i];
    }
}

console.log("Part 1: " + Math.max.apply(this, aElves));

//Part 2: Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

let top1 = Math.max.apply(this, aElves);
let top2 = Math.max.apply(this, aElves.filter((i) => i < top1));
let top3 = Math.max.apply(this, aElves.filter((i) => i < top2));
console.log("Part 2: " + (top1 + top2 + top3));