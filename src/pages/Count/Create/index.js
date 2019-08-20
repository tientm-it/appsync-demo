import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  Upload,
  Col,
  Row,
  notification
} from "antd";
import { graphql, compose } from "react-apollo";
import axios from "axios";
import { createCamera } from "../../../graphql/mutations";

import "../style.scss";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notification.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

class CreateCamera extends Component {
  state = {
    imageUrl: "",
    loading: false,
    fileName: "",
    fileType: ""
  };

  uploadToS3 = async file => {
    try {
      const res = await axios.post(
        "https://heqvks7sc5.execute-api.us-east-2.amazonaws.com/dev/s3",
        JSON.stringify({
          encodedImage: file,
          fileName: this.state.fileName,
          fileType: this.state.fileType
        }),
        {
          // method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const uploadResult = JSON.parse(res.data.body);
      console.log(uploadResult);
      return uploadResult.Location;
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = async info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      await getBase64(info.file.originFileObj, imageUrl => {
        this.props.form.setFieldsValue({
          camera_image: imageUrl
        });
        this.setState({
          imageUrl,
          fileName: info.file.name,
          fileType: info.file.type,
          loading: false
        });
      });
    }
  };

  handleSubmit = e => {
    if (this.state.loading) {
      return;
    }
    try {
      this.setState({
        loading: true
      });

      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const fileUrl = await this.uploadToS3(values.camera_image);

          const variables = {
            input: {
              cameraId: values.cameraId,
              faceId: values.faceId,
              image_url: fileUrl,
              datetime: new Date().toISOString()
            }
          };

          this.sendData(variables);
        }
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  sendData = variables => {
    this.props
      .CreateCamera({ variables })
      .then(response => {
        notification.success({
          message: "Create successfully!",
          description: "Camera Created"
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl, loading } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="camera-wapper">
        <Form
          listType="picture-card"
          style={{ width: "500px" }}
          layout="horizontal"
          onSubmit={this.handleSubmit}
          className="create-form"
          colon={false}
          hideRequiredMark={true}
        >
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("cameraId", {
                  rules: [
                    { required: true, message: "Please input Camera Id!" }
                  ]
                })(<Input placeholder="Camera ID" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("faceId", {
                  rules: [{ required: true, message: "Please input Face Id!" }]
                })(<Input placeholder="Face Id" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                {getFieldDecorator("camera_image")(
                  <Input style={{ display: "none" }} placeholder="Face Id" />
                )}
                <Upload
                  name="camera_image"
                  listType="picture-card"
                  showUploadList={false}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess("ok");
                    }, 0);
                  }}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loading}
              >
                Create
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    );
  }
}

export default compose(
  // with this I can use the mutation with this.props.CreateBand
  graphql(createCamera, { name: "CreateCamera" })
  // I can write here other mutations or queries
)(Form.create({ name: "create_camera" })(CreateCamera));
