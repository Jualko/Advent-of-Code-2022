const fs = require('fs');
const aMonkeys = fs.readFileSync('day11input.txt', 'utf8').split("\r\n\r\n").map(e => e.split("\r\n"));

function getMonkeys() {
    let oMonkeys = {};
    aMonkeys.forEach((e, i) => {
        e.forEach((m, j) => {
            switch (j) {
                case 1:
                    oMonkeys[i] = { counted: 0 };
                    oMonkeys[i].items = m.split(" ").slice(4).join("").split(",").map(g => parseInt(g));
                    break;
                case 2:
                    oMonkeys[i].operation = m.split(" ").slice(5).join("");
                    break;
                case 3:
                    oMonkeys[i].test = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                case 4:
                    oMonkeys[i].true = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                case 5:
                    oMonkeys[i].false = parseInt(m.split(" ").slice(-1)[0]);
                    break;
                default:
                    break;
            }
        })
    })
    return oMonkeys;
}

//Part 1: Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?

function monkeyBusiness() {
    let oMonkeys = getMonkeys();
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < Object.keys(oMonkeys).length; j++) {
            const oMonkey = oMonkeys[j];
            oMonkey.items.forEach(old => {
                let iNew = Math.floor(eval(oMonkey.operation) / 3);
                if (iNew % oMonkey.test === 0) {
                    oMonkeys[oMonkey.true].items.push(iNew);
                } else {
                    oMonkeys[oMonkey.false].items.push(iNew);
                }
                oMonkey.counted++;
            });
            oMonkey.items = [];
        }
    }
    return oMonkeys;
}

function getMoneyBusinessLevel(oMonkeys) {
    let aCounted = [];
    for (const key in oMonkeys) {
        aCounted.push(oMonkeys[key].counted);
    }
    aCounted = aCounted.sort((a, b) => b - a);
    return aCounted[0] * aCounted[1];
}

console.log("Part 1:", getMoneyBusinessLevel(monkeyBusiness()));