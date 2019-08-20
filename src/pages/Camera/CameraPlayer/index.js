import React, { Component } from "react";
import { Spin, Icon, Result, Row } from "antd";
import { getFile } from "../../../services/file.service";

import "./style.scss";

class CameraPlayer extends Component {
  _isMounted = false;

  state = {
    loading: false,
    imageUrl: undefined
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillReceiveProps = async nextProps => {
    if (
      nextProps.data !== this.props.data ||
      (nextProps.data !== undefined &&
        this.props.data !== undefined &&
        nextProps.data.id !== this.props.data.id)
    ) {
      try {
        this.setState({
          loading: true
        });
        if (nextProps.data) {
          const res = await getFile("camera", nextProps.data.image_url);

          if (res.data) {
            this.setState({
              imageUrl: res.data
            });
          }
        }
      } finally {
        this.setState({
          loading: false
        });
      }
    }
  };

  shouldComponentUpdate = () => {
    return true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  renderLoadingIcon = () => (
    <Spin
      style={{
        minWidth: "100%",
        height: "100%"
      }}
      size="large"
      tip="Loading..."
      indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />}
    />
  );

  renderAvatar = () => {
    const { data } = this.props;
    const { imageUrl } = this.state;
    if (imageUrl) {
      return (
        <Row className="current-camera__player-wrapper">
          <img className="current-camera" alt={data.cameraId} src={imageUrl} />
        </Row>
      );
    }

    return (
      <div className="current-camera__no-image">
        <Result
          icon={<Icon type="video-camera" theme="twoTone" />}
          title="Select a camera from the list!"
        />
      </div>
    );
  };

  render() {
    const { loading } = this.state;

    return loading ? this.renderLoadingIcon() : this.renderAvatar();
  }
}

export default CameraPlayer;
