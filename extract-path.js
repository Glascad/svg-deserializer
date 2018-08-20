const parseSVG = require('svg-path-parser');
const fs = require('fs');

module.exports = function extractPath(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            // convert data to string
            const string = data.toString();
            // extract path from svg - currently expecting only one path
            const firstIndex = string.indexOf('<path d="') + 9;
            const lastIndex = string.indexOf('"', firstIndex);
            const path = string.slice(firstIndex, lastIndex);
            // parse path into array of objects
            pathArr = parseSVG(path).filter(({ code, x, y }, i, arr) => {
                let previous = arr[i - 1];
                // filter out 'MoveTo's' that are the same as previous 'LineTo'
                return !(
                    previous
                    && code === 'M'
                    && x === previous.x
                    && y === previous.y
                );
            });
            // validate path - make sure the path closes
            // last L in each path must be equal to first M in path
            // if invalid - compare M to previous L and potentially close by adding L if distance is minimal
            resolve(pathArr);
        });
    });
}
