const fs = require('fs');
const aInstructions = fs.readFileSync('day10input.txt', 'utf8').split("\r\n");

//Part 1: Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
//Part 2: Render the image given by your program. What eight capital letters appear on your CRT?

const aCycles = [20, 60, 100, 140, 180, 220]
let iCycle = 1;
let x = 1;
let iSum = 0;
let sRow = "";

aInstructions.forEach(e => {
    let iDuration = { addx: 2, noop: 1 }[e.split(" ")[0]];
    for (let i = 0; i < iDuration; i++) {
        let iPixel = (iCycle - 1) % 40;
        sRow += (iPixel >= x - 1 && iPixel <= x + 1) ? "#" : ".";
        if (iPixel === 39) {
            console.log(sRow)
            sRow = "";
        }
        if (aCycles.includes(iCycle)) {
            iSum += x * iCycle;
        }
        if (i === iDuration - 1 && e.split(" ")[0] === "addx") {
            x += parseInt(e.split(" ")[1]);
        }
        iCycle++;
    }
});

console.log("Part 1:", iSum);