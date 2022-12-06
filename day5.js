const fs = require('fs');
const aInput = fs.readFileSync('day5input.txt', 'utf8').split("\r\n");

const iDivider = aInput.indexOf("");
const aMoves = aInput.slice(iDivider + 1, aInput.length).map(m => {
    return {
        amount: parseInt(m.split(" ")[1]),
        from: parseInt(m.split(" ")[3]) - 1,
        to: parseInt(m.split(" ")[5]) - 1
    };
});
const aCrateRows = aInput.slice(0, iDivider - 1);
const iStacks = Math.floor(aInput[0].length / 4 + 0.25);

function createStacks() {
    let aStacks = [];
    for (let i = 0; i < aCrateRows.length; i++) {
        for (let j = 0; j < iStacks; j++) {
            if (aStacks[j] === undefined) {
                aStacks[j] = [];
            }
            const sCrate = aCrateRows[i][j * 4 + 1];
            if (sCrate && sCrate.trim()) {
                aStacks[j].unshift(sCrate);
            }
        }
    }
    return aStacks;
}

function getTops(aStacks) {
    return aStacks.map(s => s[s.length - 1]).join('');
}

//Part 1: After the rearrangement procedure completes, what crate ends up on top of each stack?

function moveCrates9000(aStacks) {
    aMoves.forEach(m => {
        for (let j = 0; j < m.amount; j++) {
            aStacks[m.to].push(aStacks[m.from][aStacks[m.from].length - 1]);
            aStacks[m.from].pop();
        }
    });
    return aStacks;
}

console.log("Part 1: " + getTops(moveCrates9000(createStacks())));

//Part 2: After the rearrangement procedure completes, what crate ends up on top of each stack?

function moveCrates9001(aStacks) {
    aMoves.forEach(m => {
        for (let j = m.amount; j > 0; j--) {
            aStacks[m.to].push(aStacks[m.from][aStacks[m.from].length - j]);
        }
        for (let j = 0; j < m.amount; j++) {
            aStacks[m.from].pop();
        }
    });
    return aStacks;
}

console.log("Part 2: " + getTops(moveCrates9001(createStacks())));