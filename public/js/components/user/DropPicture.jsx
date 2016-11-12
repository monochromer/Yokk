import React from 'react';
import Dropzone from 'react-dropzone';
import store from '../../store.js';
import { uploadUserPhoto } from '../../actions/users.js';

var DropPicture = React.createClass({

    onDrop: function( files ) {
        store.dispatch(uploadUserPhoto( files, this.props._id ));
    },

    render: function( ) {
        return (
            <Dropzone className="profile_dropzone" onDrop={this.onDrop}>
                    <img src={ this.props.photo } height="205px" className="img-circle"/>
            </Dropzone>
        );
    }
});

export default DropPicture;
