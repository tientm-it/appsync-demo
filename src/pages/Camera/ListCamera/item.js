import React, { Component } from "react";
import { List, Avatar, Spin, Icon } from "antd";
import { getFile } from "../../../services/file.service";

const formatDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = ("0" + date.getDate()).slice(-2);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  return `${month} ${day}, ${year} ${hour}:${minute}:${second}`;
};

class Item extends Component {
  _isMounted = false;

  state = {
    loading: true,
    imageUrl: undefined
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.loadImage();
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.data !== this.props.data ||
      (nextProps.data !== undefined &&
        this.props.data !== undefined &&
        nextProps.data.id !== this.props.data.id)
    ) {
      this.loadImage(nextProps);
    }
  };

  loadImage = async (props = this.props) => {
    try {
      if (!this._isMounted) return;
      this.setState({
        loading: true
      });
      if (props.data) {
        const res = await getFile("camera", props.data.image_url);

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
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  renderLoadingIcon = () => (
    <Spin
      style={{
        minWidth: 250,
        height: "100%",
        cursor: "pointer"
      }}
      indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
    />
  );

  renderAvatar = () => {
    const { changeCamera, data } = this.props;
    const { imageUrl } = this.state;
    if (imageUrl) {
      return (
        <Avatar
          className="list-camera__item-avatar"
          size="large"
          shape="square"
          src={imageUrl}
          onClick={() => changeCamera(data)}
        />
      );
    }

    return (
      <div className="list-camera__item-avatar">
        <Icon style={{ fontSize: 80 }} type="file-image" theme="filled" />
      </div>
    );
  };

  renderPlaying = () => (
    <Icon
      style={{ fontSize: 50 }}
      className="blink"
      type="play-circle"
      theme="filled"
    />
  );

  render() {
    const { data } = this.props;
    const { loading } = this.state;

    return (
      <List.Item
        key={data.id}
        className="list-camera__item"
        extra={data.playing ? this.renderPlaying() : undefined}
      >
        <List.Item.Meta
          avatar={loading ? this.renderLoadingIcon() : this.renderAvatar()}
          title={<div className="list-camera-title-name">{data.cameraId}</div>}
          description={
            <div className="list-camera-title description">
              <div className="list-camera-title-face">{data.faceId}</div>
              <div className="list-camera-title-added">
                {formatDate(new Date(Date.parse(data.datetime)))}
              </div>
            </div>
          }
        />
      </List.Item>
    );
  }
}

export default Item;
