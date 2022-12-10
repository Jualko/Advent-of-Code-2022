const fs = require('fs');
const aInstructions = fs.readFileSync('day10input.txt', 'utf8').split("\r\n").map(e => e.split(" "));

//Part 1: Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
//Part 2: Render the image given by your program. What eight capital letters appear on your CRT?

let iCycle = 1;
let x = 1;
let iSum = 0;
let sCRT = "";

aInstructions.forEach(e => {
    for (let i = 1; i <= { addx: 2, noop: 1 }[e[0]]; i++, iCycle++) {
        sCRT += ((iCycle - 1) % 40 >= x - 1 && (iCycle - 1) % 40 <= x + 1 ? "██" : "░░") + ((iCycle - 1) % 40 === 39 ? "\n" : "");
        iSum += [20, 60, 100, 140, 180, 220].includes(iCycle + 1) ? x * iCycle : 0;
        x += (i === { addx: 2, noop: 1 }[e[0]] && e[0] === "addx") ? parseInt(e[1]) : 0;
    }
});
console.log("Part 1:", iSum);
console.log("Part 2:\n" + sCRT);