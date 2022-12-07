const fs = require('fs');
const aTerminalOutput = fs.readFileSync('day7input.txt', 'utf8').split("\r\n");

const sSplitChar = "/";
const iTotalDiskSpace = 70000000;
let oDirectories = {};

function initDirectory(aCommands) {
    let sCurrentDirectory;
    aCommands.forEach(c => {
        c = c.split(" ");
        if (c[1] === "cd") {
            if (c[2] === "..") {
                sCurrentDirectory = getParentDirectoy(sCurrentDirectory);
            } else {
                sCurrentDirectory = sCurrentDirectory ? sCurrentDirectory + sSplitChar + c[2] : c[2];
                oDirectories[sCurrentDirectory] = 0;
            }
        } else if (iFileSize = parseInt(c[0])) {
            addFileSizeToDirectories(sCurrentDirectory, iFileSize);
        }
    });
}

function getParentDirectoy(sDir) {
    if (sDir && sDir.includes(sSplitChar)) {
        return sDir.split(sSplitChar).slice(0, -1).join(sSplitChar);
    }
}

function addFileSizeToDirectories(sDir, iSize) {
    if (sDir) {
        oDirectories[sDir] += iSize;
        addFileSizeToDirectories(getParentDirectoy(sDir), iSize);
    }
}

initDirectory(aTerminalOutput);

//Part 1: Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

console.log("Part 1: " + Object.values(oDirectories).filter((e) => e <= 100000).reduce((a, e) => a + e, 0));

//Part 2: Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?

function getDirectoryByNeededSpace(iNeededSpace) {
    let iSpaceToDelete = iNeededSpace - (iTotalDiskSpace - oDirectories[getRootDirectory()]);
    return Object.keys(oDirectories).reduce((a, e) => {
        if (oDirectories[e] >= iSpaceToDelete && oDirectories[e] < oDirectories[a]) {
            return e;
        } else {
            return a;
        }
    });
}

function getRootDirectory(){
    return Object.keys(oDirectories).reduce((a, e) => {
        if (a.split(sSplitChar).length < e.split(sSplitChar).length) {
            return a;
        } else {
            return e;
        }
    });
}

console.log("Part 2: " + oDirectories[getDirectoryByNeededSpace(30000000)]);