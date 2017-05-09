import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'e6ai6rw0';

const CLOUDINARY_UPLOAD_URL = ' https://api.cloudinary.com/v1_1/letitmow/upload';

export default class ImgUpload extends Component {
  constructor(props){
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {

    this.setState({

      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) console.error(err);
      console.log(response.body);
    });
  }


  render() {
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onDrop}>
        <p>Drop Your Image Here Please</p>
      </Dropzone>
    );
  }
}
