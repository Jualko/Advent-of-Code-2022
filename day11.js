const fs = require('fs');
const aInput = fs.readFileSync('day11input.txt', 'utf8').split("\r\n\r\n");

function getMonkeys() {
    let aMonkeys = [];
    aInput.forEach((e, i) => {
        aLines = e.split("\r\n")
        aMonkeys[i] = { counted: 0 };
        aMonkeys[i].items = aLines[1].split(" ").slice(4).join("").split(",").map(g => parseInt(g));
        aMonkeys[i].operation = aLines[2].split(" ").slice(5).join("");
        aMonkeys[i].test = parseInt(aLines[3].split(" ").slice(-1)[0]);
        aMonkeys[i].true = parseInt(aLines[4].split(" ").slice(-1)[0]);
        aMonkeys[i].false = parseInt(aLines[5].slice(-1)[0]);
    });
    return aMonkeys;
}

//Part 1: Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
//Part 2: Worry levels are no longer divided by three after each item is inspected; you'll need to find another way to keep your worry levels manageable. Starting again from the initial state in your puzzle input, what is the level of monkey business after 10000 rounds?

function monkeyBusiness(iRounds, iPart) {
    let aMonkeys = getMonkeys();
    const sRelief = iPart === 1 ? "/3" : "%" + aMonkeys.reduce((acc, m) => acc *= m.test, 1);
    for (let i = 0; i < iRounds; i++) {
        aMonkeys.forEach(oMonkey => {
            oMonkey.items.forEach(old => {
                const iNew = Math.floor(eval(eval(oMonkey.operation) + sRelief));
                aMonkeys[oMonkey[iNew % oMonkey.test === 0 ? 'true' : 'false']].items.push(iNew);
                oMonkey.counted++;
            });
            oMonkey.items = [];
        });
    }
    return aMonkeys;
}

function getMoneyBusinessLevel(aMonkeys) {
    let aCounted = aMonkeys.map(e => e.counted).sort((a, b) => b - a);
    return aCounted[0] * aCounted[1];
}

console.log("Part 1:", getMoneyBusinessLevel(monkeyBusiness(20, 1)));
console.log("Part 2:", getMoneyBusinessLevel(monkeyBusiness(10000, 2)));