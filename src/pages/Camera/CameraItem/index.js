import React, { Component } from "react";
import axios from "axios";
import { Card } from "antd";

const { Meta } = Card;

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

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
};

const _arrayBufferToBase64 = buffer => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

class CameraItem extends Component {
  state = {
    loading: true,
    imageBase64: undefined
  };

  componentDidMount = async () => {
    try {
      this.setState({
        loading: true
      });
      if (this.props.item) {
        const key = this.props.item.image_url.replace(
          "https://appsync-image.s3.us-east-2.amazonaws.com/",
          ""
        );
        const res = await axios.get(
          `https://heqvks7sc5.execute-api.us-east-2.amazonaws.com/dev/s3?image-url=${key}`
        );
        console.log(res);

        if (res.data) {
          this.setState({
            imageBase64: `data:image/jpeg;base64,${_arrayBufferToBase64(
              res.data.Body.data
            )}`
          });
        }
      }
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { item } = this.props;
    const {
      loading,
      imageBase64 = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    } = this.state;

    return (
      <Card
        loading={loading}
        style={{ width: "500px" }}
        cover={<img alt={item.cameraId} src={imageBase64} />}
      >
        <Meta
          title={item.cameraId}
          description={
            <div>
              <div>{item.faceId}</div>
              <div>{formatDate(new Date(Date.parse(item.datetime)))}</div>
            </div>
          }
        />
      </Card>
    );
  }
}

export default CameraItem;
