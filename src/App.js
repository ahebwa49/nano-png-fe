import React from "react";
import { connect } from "react-redux";
import { photoCompressFetch, photoDownloadFetch } from "./actions/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
  }

  handlePhotoChange = e => {
    this.setState({
      photo: e.target.files[0]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      compressing: true
    });

    let formData = new FormData();

    formData.append("avatar", this.state.photo);

    this.props.photoCompressFetch(formData);
  };

  handleDownload = e => {
    const { filename } = this.props.image;
    e.preventDefault();
    this.props.photoDownloadFetch(filename);
  };
  render() {
    const { photo } = this.state;
    let { image } = this.props;

    let sizeInkBs;
    let newSizeInkBs;
    let percentageDecrease;

    if (photo) {
      sizeInkBs = photo.size / 1000;
    }

    if (image.finished) {
      newSizeInkBs = image.newFileSizeInBytes / 1000;
      percentageDecrease = Math.round(100 - (newSizeInkBs / sizeInkBs) * 100);
    }
    return (
      <div className="app">
        <form
          className="form"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Photo
            </label>

            <input
              type="file"
              id="photo"
              name="photo"
              onChange={this.handlePhotoChange}
              required
            />
            {/* <input type="file" name="gallery" multiple /> */}
          </div>
          <div className="button-div">
            <button type="submit" className="form-button">
              compress
            </button>
          </div>
        </form>
        <div className="images">
          {this.state.photo && (
            <div className="image">
              <div className="imageName">{this.state.photo.name}</div>
              {this.state.photo && (
                <div className="imageSize">{`${sizeInkBs} KB`}</div>
              )}
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
                <div className="imageSize">{`-${percentageDecrease} %`}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.image);
  return {
    error: state.error,
    user: state.user,
    image: state.image
  };
};

const mapDispatchToProps = dispatch => ({
  photoCompressFetch: formData => {
    dispatch(photoCompressFetch(formData));
  },
  photoDownloadFetch: filename => {
    dispatch(photoDownloadFetch(filename));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
