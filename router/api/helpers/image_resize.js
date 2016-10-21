'use strict';

const easyimg = require('easyimage');

module.exports = function(imageInfo, sizesArray = []) {
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
            if (err) return err;
        });
    })

};
