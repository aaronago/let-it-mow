import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'e6ai6rw0';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/letitmow/upload';

export default class ImgUpload extends Component {
  constructor(props){
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      public_ids: []
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.props.handleImageUpload(files[0]);
  }

  render() {
    return (
      <div>
        <div>
          <Dropzone
            className="dropzone"
            activeStyle={{"border": "4px solid #1bcc72"}}
            multiple={false}
            accept="image/*"
            onDrop={this.onDrop}>
            <p>Drop Your Image Here Please</p>
          </Dropzone>
        </div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null:
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} alt=""/>
          </div>

          }
      </div>
    );
  }
}
