const fs = require('fs');
const aTerminalOutput = fs.readFileSync('day7input.txt', 'utf8').split("\r\n");

let oDirectories = {};
let sCurrentDirectory = "";

function createDirectory(sDirectory) {
    if (!oDirectories[sDirectory]) {
        oDirectories[sDirectory] = {
            "size": 0,
            "files": [],
            "subdirectories": []
        };
    }
}

function getParentDirectoy(sDirectory) {
    if (sDirectory) {
        if (sDirectory.split("-").length > 1) {
            return sDirectory.split("-").slice(0, -1).join("-");
        } else {
            return undefined
        }
    }
}

function addFileSizeToParentDirectories(sDirectory, iSize) {
    if (sDirectory) {
        oDirectories[sDirectory].size += iSize;
        addFileSizeToParentDirectories(getParentDirectoy(sDirectory), iSize);
    }
}

for (let i = 0; i < aTerminalOutput.length; i++) {
    const element = aTerminalOutput[i].split(" ");
    if (element[0] === "$") {
        if (element[1] === "cd") {
            if (element[2] === "..") {
                sCurrentDirectory = getParentDirectoy(sCurrentDirectory);
            } else {
                if (sCurrentDirectory) {
                    sCurrentDirectory += "-" + element[2];
                }
                else {
                    sCurrentDirectory = element[2];
                }
                createDirectory(sCurrentDirectory);
            }
        }
    } else if (element[0] === "dir") {
        oDirectories[sCurrentDirectory].subdirectories.push(element[1]);
    } else { //file
        oDirectories[sCurrentDirectory].files.push(element[1]);
        addFileSizeToParentDirectories(sCurrentDirectory, parseInt(element[0]));
    }
}

//Part 1: Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

function getDirectoryNamesWithMaxSize(iMaxSize) {
    return Object.values(oDirectories)
        .filter((e) => e.size <= iMaxSize)
        .reduce((c, e) => c + e.size, 0);
}

console.log(getDirectoryNamesWithMaxSize(100000));