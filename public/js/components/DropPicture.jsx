import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

var DropPicture = React.createClass({
    onDrop: function (files) {
        var file = files[0];
        var postUrl = '/upload_profile_picture/users/' + this.props.login;

        request
            .post(postUrl)
            .attach('pic', file)
            .end(function(err, res) {
                console.log(res);
            });
    },
    render: function () {
        return (
            <Dropzone onDrop={ this.onDrop }>
                <div className="profile__dropzone vertical-center">
                    <img src={ this.props.photo } width="180px" className="center-block"/>
                </div>
            </Dropzone>
        );
    }
});

export default DropPicture;
