const fs = require('fs');
const sDatastream = fs.readFileSync('day6input.txt', 'utf8');

function detectMarker(markerlength) {
    for (let i = 0; i < sDatastream.length; i++) {
        const aMarker = sDatastream.slice(i, i + markerlength);
        if (new Set(aMarker).size === aMarker.length) {
            return sDatastream.indexOf(aMarker) + markerlength;
        }
    }
}

//Part 1: How many characters need to be processed before the first start-of-packet marker is detected?

console.log("Part 1: " + detectMarker(4));

//Part 2: How many characters need to be processed before the first start-of-message marker is detected?

console.log("Part 2: " + detectMarker(14));