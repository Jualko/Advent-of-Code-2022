const fs = require('fs');
const aRucksacks = fs.readFileSync('day3input.txt', 'utf8').split("\r\n").map(e => [e.slice(0, e.length / 2), e.slice(e.length / 2, e.length)]);

//Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

function getPriority(c) {
    let priority = c.charCodeAt(0) - 96;
    if (priority < 1 || priority > 26) {
        priority = c.charCodeAt(0) - 38;
    }
    return priority;
}

iSumOfPriorities = 0;

aRucksacks.forEach(rucksack => {
    for (let i = 0; i < rucksack[0].length; i++) {
        const c = rucksack[0][i];
        if (rucksack[1].includes(c)) {
            iSumOfPriorities += getPriority(c);
            break;
        }
    }
})

console.log(iSumOfPriorities)