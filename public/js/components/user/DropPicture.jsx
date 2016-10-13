import React from 'react';
import Dropzone from 'react-dropzone';
import store from '../../store.js';
import { uploadUserPhoto } from '../../actions/users.js';

var DropPicture = React.createClass({

    onDrop: function( files ) {
        store.dispatch(uploadUserPhoto( files, this.props.login ));
    },

    render: function( ) {
        return (
            <Dropzone onDrop={this.onDrop}>
                <div className="profile__dropzone vertical-center">
                    <img src={this.props.photo} height="180px" className="center-block"/>
                </div>
            </Dropzone>
        );
    }
});

export default DropPicture;
