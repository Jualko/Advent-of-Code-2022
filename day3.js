const fs = require('fs');
const aRucksacks = fs.readFileSync('day3input.txt', 'utf8').split("\r\n");

function getPriority(c) {
    let priority = c.charCodeAt(0) - 96;
    if (priority < 1 || priority > 26) {
        priority = c.charCodeAt(0) - 38;
    }
    return priority;
}

//Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

console.log("Part 1: " + aRucksacks.reduce(reduceRucksack, 0));

function reduceRucksack(a, r) {
    r = [r.slice(0, r.length / 2), r.slice(r.length / 2, r.length)];
    for (let i = 0; i < r[0].length; i++) {
        if (r[1].includes(r[0][i])) {
            return a + getPriority(r[0][i]);
        }
    }
}

//Part 2: Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

let aGroups = [];
for (let i = 0; i < aRucksacks.length; i += 3) {
    aGroups.push(aRucksacks.slice(i, i + 3));
}

console.log("Part 2: " + aGroups.reduce(reduceGroups, 0));

function reduceGroups(a, g) {
    for (let i = 0; i < g[0].length; i++) {
        if (g[1].includes(g[0][i]) && g[2].includes(g[0][i])) {
            return a + getPriority(g[0][i]);
        }
    }
}