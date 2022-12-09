const fs = require('fs');
const aMotions = fs.readFileSync('day9input.txt', 'utf8').split("\r\n").map(m => m.split(" "));

let oHead = { x: 0, y: 0 };
let oTail = { x: 0, y: 0 };
let oPositions = new Set();

//Part 1: Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?

function moveRope() {
    console.log("== Initial State ==");
    console.log("Head: ", oHead);
    console.log("Tail: ", oTail);
    console.log("");
    aMotions.forEach(m => {
        console.log("==", m[0], m[1], "==");
        for (let i = 0; i < m[1]; i++) {
            switch (m[0]) {
                case "R":
                    oHead.x += 1;
                    break;
                case "L":
                    oHead.x -= 1;
                    break;
                case "U":
                    oHead.y += 1;
                    break;
                case "D":
                    oHead.y -= 1;
                    break;
            }
            console.log("Head: ", oHead);
            moveTail();
            oPositions.add(oTail.x + "-" + oTail.y);
            console.log("Tail: ", oTail);
            console.log("");
        }
    });
}

function moveTail() {
    if (!isTouching()) {
        const oVector = getVector();
        console.log("Motion-Vector:", oVector);
        if (oVector.x === 0) {
            oTail.y += 1 * Math.sign(oVector.y);
        }
        else if (oVector.y === 0) {
            oTail.x += 1 * Math.sign(oVector.x);
        } else {
            oTail.x += 1 * Math.sign(oVector.x);
            oTail.y += 1 * Math.sign(oVector.y);
        }
    } else {
        console.log("tail touching head");
    }
};

function isTouching() {
    return (oTail.x === oHead.x && oTail.y === oHead.y) || (oTail.y === oHead.y && (oTail.x === oHead.x - 1 || oTail.x === oHead.x + 1)) || (oTail.x === oHead.x && (oTail.y === oHead.y - 1 || oTail.y === oHead.y + 1)) || (oTail.x === oHead.x - 1 || oTail.x === oHead.x + 1) && (oTail.y === oHead.y - 1 || oTail.y === oHead.y + 1);
};

function getVector() {
    return { x: oHead.x - oTail.x, y: oHead.y - oTail.y };
}

moveRope();
console.log("Part 1:", oPositions.size)