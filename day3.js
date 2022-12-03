const fs = require('fs');
const aRucksacks = fs.readFileSync('day3input.txt', 'utf8').split("\r\n");

//Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

function getPriority(c) {
    let priority = c.charCodeAt(0) - 96;
    if (priority < 1 || priority > 26) {
        priority = c.charCodeAt(0) - 38;
    }
    return priority;
}

iSumOfPriorities = 0;

aRucksacks.map(e => [e.slice(0, e.length / 2), e.slice(e.length / 2, e.length)]).forEach(rucksack => {
    for (let i = 0; i < rucksack[0].length; i++) {
        const c = rucksack[0][i];
        if (rucksack[1].includes(c)) {
            iSumOfPriorities += getPriority(c);
            break;
        }
    }
})

console.log("Part 1: " + iSumOfPriorities)

//Part 2: Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

aGroups = [];
for (let i = 0; i < aRucksacks.length; i += 3) {
    aGroups.push([aRucksacks[i], aRucksacks[i + 1], aRucksacks[i + 2]]);   
}

iSumOfPriorities = 0;

aGroups.map(group => {
    for (let i = 0; i < group[0].length; i++) {
        const c = group[0][i];
        if (group[1].includes(c) && group[2].includes(c)) {
            iSumOfPriorities += getPriority(c);
            break;
        }
    }
})

console.log("Part 2: " + iSumOfPriorities)