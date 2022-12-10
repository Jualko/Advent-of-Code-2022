const fs = require('fs');
const aInstructions = fs.readFileSync('day10input.txt', 'utf8').split("\r\n");

//Part 1: Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?

function getSignalStrengthSumByCycles(...aCycles) {
    let iCycle = 1;
    let x = 1;
    let iSum = 0;

    aInstructions.forEach(e => {
        let iDuration = { addx: 2, noop: 1 }[e.split(" ")[0]];

        for (let i = 0; i < iDuration; i++) {
            if (aCycles.includes(iCycle)) {
                iSum += x * iCycle;
            }
            if (i === 0) {
            }
            if (i === iDuration - 1) {
                if (e.split(" ")[0] === "addx") {
                    x += parseInt(e.split(" ")[1]);
                }
            }
            iCycle++;
        }
    });
    return iSum;
}

console.log("Part 1:", getSignalStrengthSumByCycles(20, 60, 100, 140, 180, 220));

//Part 2: Render the image given by your program. What eight capital letters appear on your CRT?

function drawImage() {
    let iCycle = 1;
    let x = 1;
    let sRow = "";

    aInstructions.forEach(e => {
        let iDuration = { addx: 2, noop: 1 }[e.split(" ")[0]];

        for (let i = 0; i < iDuration; i++) {
            if ((iCycle - 1) % 40 === x - 1 || (iCycle - 1) % 40 === x || (iCycle - 1) % 40 === x + 1) {
                sRow += "#";
            } else {
                sRow += ".";
            }
            if ((iCycle - 1) % 40 === 39) {
                console.log(sRow)
                sRow = "";
            }
            if (i === iDuration - 1) {
                if (e.split(" ")[0] === "addx") {
                    x += parseInt(e.split(" ")[1]);
                }
            }
            iCycle++;
        }
    });
}

console.log("Part 2:");
drawImage();