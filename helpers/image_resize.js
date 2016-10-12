'use strict'

const easyimg = require('easyimage');

module.exports = (imageInfo, sizesArrayfoo = []) => {
    sizesArrayfoo.forEach((size) => {
        const destination = '';
        const width = +size.split('-')[0];
        const height = +size.split('-')[1];

        easyimg.rescrop({
            src: imageInfo.dir + imageInfo.name,
            dst: imageInfo.dir + size + '-' + imageInfo.name,
            width: width,
            height: height,
            cropwidth: width,
            cropheight: height,
            x: 0,
            y: 0
        }).then(
            function(image) {
                return (true);
            },
            function(err) {
                return (false);
            }
        );
    })

}
