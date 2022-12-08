const fs = require('fs');
const aTreeHeightMap = fs.readFileSync('day8input.txt', 'utf8').split("\r\n").map(t => t.split("").map(t => parseInt(t)));

//Part 1: Consider your map; how many trees are visible from outside the grid?

function getCountVisibleTrees() {
    let visible = 0;
    for (let y = 0; y < aTreeHeightMap.length; y++) {
        for (let x = 0; x < aTreeHeightMap[y].length; x++) {
            if (isVisible(y, x)) {
                visible++;
            }
        }
    }
    return visible;
}

function isVisible(iY, iX) {
    return !isInterior(iY, iX) || isVisibleFromTop(iY, iX) || isVisibleFromBottom(iY, iX) || isVisibleFromLeft(iY, iX) || isVisibleFromRight(iY, iX);
};

function isInterior(iY, iX) {
    return ((iY !== 0 && iY !== aTreeHeightMap.length - 1) && (iX !== 0 && iX !== aTreeHeightMap[0].length - 1));
}

function isVisibleFromTop(iY, iX) {
    for (let i = iY - 1; i >= 0; i--) {
        if (aTreeHeightMap[i][iX] >= aTreeHeightMap[iY][iX]) {
            return false;
        }
    }
    return true;
}

function isVisibleFromBottom(iY, iX) {
    for (let i = iY + 1; i < aTreeHeightMap.length; i++) {
        if (aTreeHeightMap[i][iX] >= aTreeHeightMap[iY][iX]) {
            return false;
        }
    }
    return true;
}

function isVisibleFromLeft(iY, iX) {
    for (let i = iX - 1; i >= 0; i--) {
        if (aTreeHeightMap[iY][i] >= aTreeHeightMap[iY][iX]) {
            return false;
        }
    }
    return true;
}

function isVisibleFromRight(iY, iX) {
    for (let i = iX + 1; i < aTreeHeightMap[iY].length; i++) {
        if (aTreeHeightMap[iY][i] >= aTreeHeightMap[iY][iX]) {
            return false;
        }
    }
    return true;
}

console.log("Part 1: " + getCountVisibleTrees());

//Part 2: Consider each tree on your map. What is the highest scenic score possible for any tree?

function getMaxScenicScore() {
    let iMax = 1;
    for (let y = 0; y < aTreeHeightMap.length; y++) {
        for (let x = 0; x < aTreeHeightMap[y].length; x++) {
            let iScore = getScenicScore(y, x);
            if (iScore > iMax) {
                iMax = iScore;
            }
        }
    }
    return iMax;
}

function getScenicScore(iY, iX) {
    return getScenicScoreFromTop(iY, iX) * getScenicScoreFromBottom(iY, iX) * getScenicScoreFromLeft(iY, iX) * getScenicScoreFromRight(iY, iX);
}

function getScenicScoreFromTop(iY, iX) {
    let iScore = 0;
    for (let i = iY - 1; i >= 0; i--) {
        iScore++;
        if (aTreeHeightMap[i][iX] >= aTreeHeightMap[iY][iX]) {
            break;
        }
    }
    return iScore;
}

function getScenicScoreFromBottom(iY, iX) {
    let iScore = 0;
    for (let i = iY + 1; i < aTreeHeightMap.length; i++) {
        iScore++;
        if (aTreeHeightMap[i][iX] >= aTreeHeightMap[iY][iX]) {
            break;
        }
    }
    return iScore;
}

function getScenicScoreFromLeft(iY, iX) {
    let iScore = 0;
    for (let i = iX - 1; i >= 0; i--) {
        iScore++;
        if (aTreeHeightMap[iY][i] >= aTreeHeightMap[iY][iX]) {
            break;
        }
    }
    return iScore;
}

function getScenicScoreFromRight(iY, iX) {
    let iScore = 0;
    for (let i = iX + 1; i < aTreeHeightMap[iY].length; i++) {
        iScore++;
        if (aTreeHeightMap[iY][i] >= aTreeHeightMap[iY][iX]) {
            break;
        }
    }
    return iScore;
}

console.log("Part 2: " + getMaxScenicScore());