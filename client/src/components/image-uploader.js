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
    console.log(this.state.public_ids)
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, res) => {
      if (err) console.error(err);
      if (res.body.secure_url !== '') {
        console.log(res.body);
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url,
          public_ids: [...this.state.public_ids, res.body.public_id]
        });
      }
    });
  }


  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone
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
