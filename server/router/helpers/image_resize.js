'use strict';

const easyimg = require('easyimage');

module.exports = function(imageInfo, sizesArray = [], callback) {
    sizesArray.forEach((size) => {
        const width = +size.split('-')[0];
        const height = +size.split('-')[1];

        easyimg.thumbnail({
            src: imageInfo.dir + imageInfo.name,
            dst: imageInfo.dir + size + '-' + imageInfo.name,
            width: width,
            height: height,
            cropwidth: width,
            cropheight: height,
            x: 0,
            y: 0
        }).then((err) => {
            callback(null);
            if (err) return err;
        });
    })

};
