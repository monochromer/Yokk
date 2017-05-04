import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import store from '../../store.js'
import {uploadUserPhoto, deleteUserPhoto} from '../../actions/users.js'

export default class DropPicture extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
  }

  onDrop(files) {
    store.dispatch(uploadUserPhoto(files, this.props._id));
  }

  deletePicture(e) {
    e.preventDefault()
    store.dispatch( deleteUserPhoto(this.props._id) );
  }

  render() {

    const uploadingPhoto = (
      <i className="demo-icon icon-spin3 animate-spin">&#xe832;</i>
    );

    return (
      <div className="profile_photo_container">
        <Dropzone className="profile_dropzone" onDrop={this.onDrop}>
          {this.props.uploading
            ? uploadingPhoto
            : <img src={this.props.photo} height="205px" className="img-circle" alt="uploading" />}
        </Dropzone>
        <div className="avatar_delete_btn_container">
          <div className="btn__delete_profile_img_div">
            <a onClick={this.deletePicture} href="#" className="btn__delete_profile_img_a">Delete picture</a>
          </div>
        </div>
      </div>
    );
  }
}

DropPicture.propTypes = {
  _id: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  uploading: PropTypes.bool.isRequired
}
