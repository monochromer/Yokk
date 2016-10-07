'use strict'

const fs = require('fs');
const path = require("path");

const deleteFolderRecursive = (pathToDelete) => {
    if (fs.existsSync(pathToDelete)) {
        fs.readdirSync(pathToDelete).forEach((file, index) => {
            var curPath = path.join(pathToDelete, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(pathToDelete);
    }
};

module.exports = deleteFolderRecursive;
