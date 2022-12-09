const fs = require('fs');
const aMotions = fs.readFileSync('day9input.txt', 'utf8').split("\r\n").map(m => m.split(" "));

//Part 1: Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?

function getTailVisitedPositions(iKnots) {
    let oPositions = new Set;
    let aKnots = [];

    for (let i = 0; i < iKnots; i++) {
        aKnots.push({ x: 0, y: 0 });
    }

    aMotions.forEach(m => {
        for (let i = 0; i < m[1]; i++) {
            switch (m[0]) {
                case "R":
                    aKnots[0].x += 1;
                    break;
                case "L":
                    aKnots[0].x -= 1;
                    break;
                case "U":
                    aKnots[0].y += 1;
                    break;
                case "D":
                    aKnots[0].y -= 1;
                    break;
            }
            for (let i = 1; i < aKnots.length; i++) {
                const oVector = { x: aKnots[i - 1].x - aKnots[i].x, y: aKnots[i - 1].y - aKnots[i].y };
                if (Math.abs(oVector.x) > 1 || Math.abs(oVector.y) > 1) {
                    aKnots[i].x += 1 * Math.sign(oVector.x);
                    aKnots[i].y += 1 * Math.sign(oVector.y);
                }
            }
            oPositions.add(aKnots[aKnots.length - 1].x + "-" + aKnots[aKnots.length - 1].y);
        }
    });
    return oPositions;
}

console.log("Part 1:", getTailVisitedPositions(2).size);

//Part 2: Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?

console.log("Part 2:", getTailVisitedPositions(10).size);