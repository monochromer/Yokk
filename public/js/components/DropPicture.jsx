import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

var DropPicture = React.createClass({
    onDrop: function (files) {
        var file = files[0];
        var user_login = 'user_login'; //THIS IS FROM STATE OR STORE
        var postUrl = '/upload_profile_picture/users/'+user_login;

        request
            .post(postUrl)
            .attach('pic', file)
            .end(function(err, res){
                console.log(res);
            });
    },
    render: function () {
        return (
            <Dropzone onDrop={ this.onDrop } size={ 150 }>
                <div>
                    Drop your profile picture here or click and choose!
                </div>
            </Dropzone>
        );
    }
});

export default DropPicture;
