const fs = require('fs');
const aInput = fs.readFileSync('day5input.txt', 'utf8').split("\r\n");

//Part 1: After the rearrangement procedure completes, what crate ends up on top of each stack?

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

for (let i = 0; i < aMoves.length; i++) {
    const oMove = aMoves[i];
    for (let j = 0; j < oMove.amount; j++) {
        aStacks[oMove.to].push(aStacks[oMove.from][aStacks[oMove.from].length - 1]);
        aStacks[oMove.from].pop();
    }
}

let sTop = "";
aStacks.forEach(s => {sTop += s[s.length - 1]})
console.log("Part 1: " + sTop);