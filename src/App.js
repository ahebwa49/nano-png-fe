import React from "react";
import { connect } from "react-redux";
import {
  photoCompressFetch,
  photoDownloadFetch,
  uploadNewImage,
  removeOldImage
} from "./actions/actions";

let id = 0;
let newImage;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerInputFile = () => this.fileInput.click();
  handlePhotoChange = async e => {
    e.persist();
    if (e.target.files.length === 1 && this.props.images.length === 0) {
      newImage = e.target.files[0];
      newImage.id = id++;
      await this.props.uploadNewImage(newImage);
      this.handleSubmit();
    } else if (e.target.files.length === 1 && this.props.images.length > 0) {
      await this.props.removeOldImage();
      newImage = e.target.files[0];
      newImage.id = id++;
      await this.props.uploadNewImage(newImage);
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    let formData = new FormData();

    formData.append("avatar", newImage);

    this.props.photoCompressFetch(formData);
  };

  handleDownload = e => {
    const { filename } = this.props.image;
    e.preventDefault();
    this.props.photoDownloadFetch(filename);
  };
  render() {
    let { image } = this.props;

    let oldSizeInkBs;
    let newSizeInkBs;
    let percentageDecrease;

    if (image.finished) {
      oldSizeInkBs = image.originalFileSizeInBytes / 1000;
      newSizeInkBs = image.newFileSizeInBytes / 1000;
      percentageDecrease = Math.round(
        100 - (newSizeInkBs / oldSizeInkBs) * 100
      );
    }
    return (
      <div className="app">
        <div className="upload-btn-wrapper">
          <button className="upload-btn" onClick={this.triggerInputFile}>
            <input
              accept="image/*"
              type="file"
              ref={fileInput => (this.fileInput = fileInput)}
              onChange={this.handlePhotoChange}
              multiple
            />
            <img src="static/img/upload.png" alt="" />
            <div className="upload-btn-text">
              <h2>Upload Image</h2>
              <p>(.png .jpg .jpeg)</p>
            </div>
          </button>
          <p>*No Sign Up Required</p>
        </div>
        <div className="images">
          {this.props.images.map(image => {
            let sizeInkBs;
            sizeInkBs = image.size / 1000;

            return (
              <div className="image" key={image.id}>
                <div className="imageName">{image.name}</div>

                <div className="imageSize">{`${sizeInkBs} KB`}</div>

                {this.props.image.isCompressing && (
                  <div className="compressing">compressing ...</div>
                )}
                {this.props.image.finished && (
                  <div className="finished">finished</div>
                )}
                {this.props.image.finished && (
                  <div className="imageSize">{`${newSizeInkBs} KB`}</div>
                )}
                {this.props.image.finished && (
                  <div
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={this.handleDownload}
                    className="download"
                  >
                    Download
                  </div>
                )}
                {this.props.image.finished && (
                  <div className="percentage">{`-${percentageDecrease} %`}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    user: state.user,
    image: state.image,
    images: state.images
  };
};

const mapDispatchToProps = dispatch => ({
  photoCompressFetch: formData => {
    dispatch(photoCompressFetch(formData));
  },
  photoDownloadFetch: filename => {
    dispatch(photoDownloadFetch(filename));
  },
  uploadNewImage: image => {
    dispatch(uploadNewImage(image));
  },
  removeOldImage: () => {
    dispatch(removeOldImage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
