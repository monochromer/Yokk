var multer  = require('multer');

var uploadPicture = function( req, res ) {

    var storage = multer.diskStorage({
        destination: './uploads/users/',
        filename: function (req, file, cb) {
            cb(null, req.params.user_login+'.jpg')
        }
    });

    var upload = multer({ storage : storage}).any();

    upload( req, res, function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
            console.log('File uploaded:');
            req.files.forEach( function(f) {
            console.log(f);
            // and move file to final destination...
        });
            res.end("File has been uploaded");
        }
    });

    return true;
}

module.exports = uploadPicture;
