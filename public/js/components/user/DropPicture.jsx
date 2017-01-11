import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import store from '../../store.js'
import {uploadUserPhoto, deleteUserPhoto} from '../../actions/users.js'

export default class DropPicture extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
  }

  // static propTypes = {
  //   _id: React.PropTypes.string.isRequired,
  //   photo: React.PropTypes.string, //
  //   uploading: React.PropTypes.bool
  // }

  onDrop(files) {
    store.dispatch(uploadUserPhoto(files, this.props._id));
  }

  deletePicture() {
    store.dispatch( deleteUserPhoto(this.props._id) );
  }

  render() {
    console.log(this.props);
    const {onDrop, deletePicture} = this;

    const uploadingPhoto = (
      <i className="demo-icon icon-spin3 animate-spin">&#xe832;</i>
    );

    return (
      <div>
        <Dropzone className="profile_dropzone" onDrop={this.onDrop}>
          {this.props.uploading
            ? uploadingPhoto
            : <img src={this.props.photo} height="205px" className="img-circle"/>}
        </Dropzone>
        <button onClick={this.deletePicture}>Delete picture</button>
      </div>
    );
  }
}
