const fs = require('fs');
const sDatastream = fs.readFileSync('day6input.txt', 'utf8');

function detectMarker(datastream, markerlength) {
    let aMarker = [];
    for (let i = 0; i < datastream.length; i++) {
        aMarker.push(datastream[i]);
        if (aMarker.length === markerlength) {
            if (new Set(aMarker).size === aMarker.length) {
                return datastream.indexOf(aMarker.join('')) + markerlength;
            }
            aMarker.shift();
        }
    }
}

//Part 1: How many characters need to be processed before the first start-of-packet marker is detected?

console.log("Part 1: " + detectMarker(sDatastream, 4));

//Part 2: How many characters need to be processed before the first start-of-message marker is detected?

console.log("Part 2: " + detectMarker(sDatastream, 14));