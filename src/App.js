import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { photoCompressFetch } from "./actions/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
  }

  handlePhotoChange = e => {
    this.setState(
      {
        photo: e.target.files[0]
      },
      () => console.log(this.state.photo)
    );
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
  render() {
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
              <div>{this.state.photo.name}</div>
              {this.props.image.isCompressing && <div>compressing ...</div>}
              {this.props.image.finished && <div>finished</div>}
              {this.props.image.finished && (
                <a
                  href={`${this.props.image.link}`}
                  style={{ textDecoration: "underline" }}
                  download
                >
                  <div>Download</div>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.image);
  return {
    error: state.error,
    user: state.user,
    image: state.image
  };
};

const mapDispatchToProps = dispatch => ({
  photoCompressFetch: formData => {
    dispatch(photoCompressFetch(formData));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
