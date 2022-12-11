const fs = require('fs');
const aInput = fs.readFileSync('day11input.txt', 'utf8').split("\r\n\r\n").map(e => e.split("\r\n"));

function getMonkeys() {
    let aMonkeys = [];
    aInput.forEach((e, i) => {
        e.forEach((m, j) => {
            switch (j) {
                case 1:
                    aMonkeys[i] = { counted: 0 };
                    aMonkeys[i].items = m.split(" ").slice(4).join("").split(",").map(g => parseInt(g));
                    break;
                case 2:
                    aMonkeys[i].operation = m.split(" ").slice(5).join("");
                    break;
                case 3:
                    aMonkeys[i].test = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                case 4:
                    aMonkeys[i].true = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                case 5:
                    aMonkeys[i].false = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                default:
                    break;
            }
        })
    })
    return aMonkeys;
}

//Part 1: Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
//Part 2: Worry levels are no longer divided by three after each item is inspected; you'll need to find another way to keep your worry levels manageable. Starting again from the initial state in your puzzle input, what is the level of monkey business after 10000 rounds?

function monkeyBusiness(iRounds, iPart) {
    let aMonkeys = getMonkeys();
    let sRelief = iPart === 1 ? "/3" : "%" + aMonkeys.reduce((acc, m) => acc *= m.test, 1);
    for (let i = 0; i < iRounds; i++) {
        for (let j = 0; j < Object.keys(aMonkeys).length; j++) {
            const oMonkey = aMonkeys[j];
            oMonkey.items.forEach(old => {
                let iNew = Math.floor(eval(eval(oMonkey.operation) + sRelief));
                if (iNew % oMonkey.test === 0) {
                    aMonkeys[oMonkey.true].items.push(iNew);
                } else {
                    aMonkeys[oMonkey.false].items.push(iNew);
                }
                oMonkey.counted++;
            });
            oMonkey.items = [];
        }
    }
    return aMonkeys;
}

function getMoneyBusinessLevel(aMonkeys) {
    let aCounted = aMonkeys.map(e => e.counted).sort((a, b) => b - a);
    return aCounted[0] * aCounted[1];
}

console.log("Part 1:", getMoneyBusinessLevel(monkeyBusiness(20, 1)));
console.log("Part 2:", getMoneyBusinessLevel(monkeyBusiness(10000, 2)));