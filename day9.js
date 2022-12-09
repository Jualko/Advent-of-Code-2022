const fs = require('fs');
const aMotions = fs.readFileSync('day9input.txt', 'utf8').split("\r\n").map(m => m.split(" "));

//Part 1: Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?

function moveRope(iKnots) {
    let oPositions = new Set();
    let aKnots = getKnots(iKnots);
    let oHead = aKnots[0];

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

            for (let i = 1; i < aKnots.length; i++) {
                const oKnot = aKnots[i];
                const oVector = getVector(aKnots[i - 1], aKnots[i]);
                console.log("vector", oVector)
                if (!isTouching(oVector)) {
                    moveTail(aKnots[i], oVector);
                    console.log("move knot",i)
                } else {
                    console.log("knot",i, "touching",i-1||"head");
                }
            }
            console.log("Rope", aKnots);
            console.log("");

            oPositions.add(aKnots[aKnots.length - 1].x + "-" + aKnots[aKnots.length - 1].y);
        }
    });
    return oPositions.size;
}

function getKnots(iKnots) {
    console.log("== Initial State ==");
    let aKnots = [{ x: 0, y: 0 }]; //head
    for (let i = 0; i < iKnots - 1; i++) {
        aKnots.push({ x: 0, y: 0 });
    }
    console.log("Rope", aKnots);
    console.log("");
    return aKnots
}

function moveTail(oT, oV) {
    if (oV.x === 0) {
        oT.y += 1 * Math.sign(oV.y);
    }
    else if (oV.y === 0) {
        oT.x += 1 * Math.sign(oV.x);
    } else {
        oT.x += 1 * Math.sign(oV.x);
        oT.y += 1 * Math.sign(oV.y);
    }
};

function isTouching(oVector) {
    return Math.abs(oVector.x) < 2 && Math.abs(oVector.y) < 2;
};

function getVector(oH, oT) {
    return { x: oH.x - oT.x, y: oH.y - oT.y };
}

console.log("Part 1:", moveRope(2));

//Part 2: Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?

console.log("Part 2:", moveRope(10));