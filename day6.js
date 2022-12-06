const fs = require('fs');
const sDatastream = fs.readFileSync('day6input.txt', 'utf8');

//Part 1: How many characters need to be processed before the first start-of-packet marker is detected?

const iMarkerLength = 4;
let aMarker = [];

for (let i = 0; i < sDatastream.length; i++) {
    const character = sDatastream[i];
    aMarker.push(character);
    if (aMarker.length === iMarkerLength) {
        if (new Set(aMarker).size === aMarker.length) {
            console.log("Part 1: " + (sDatastream.indexOf(aMarker.join('')) + iMarkerLength));
            break;
        }
        aMarker.shift();
    }
}