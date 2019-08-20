import React, { Component } from "react";
import { graphql } from "react-apollo";
import { buildSubscription } from "aws-appsync";
import { Row, Col, Alert, Card } from "antd";

import graphQuery from "../../graphql/GraphQCountPeople";
import ListCamera from "./ListCamera";
import CameraPlayer from "./CameraPlayer";
import withClient from "../../components/AwsAppSync";

import "./style.scss";

class Count extends Component {
  state = {
    currentCamera: undefined
  };

  componentDidMount = () => {
    this.props.subscribeToMore(
      buildSubscription(graphQuery.subscribe, graphQuery.queryAll)
    );
  };

  handleChangeCamera = camera => {
    this.setState({
      currentCamera: camera
    });
  };

  render() {
    const { error, items, loading } = this.props;
    const { currentCamera } = this.state;
    const sortedItems = items
      .sort((a, b) => {
        if (Date.parse(a.datetime) < Date.parse(b.datetime)) return 1;
        if (Date.parse(a.datetime) > Date.parse(b.datetime)) return -1;
        return 0;
      })
      .map(item => {
        item.playing = currentCamera ? item.id === currentCamera.id : false;
        return item;
      });

    return (
      <Card title="People Count" bordered={false}>
        <div className="camera">
          {error ? (
            <Alert
              className="wrapper-error"
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ minWidth: "50%" }}
            />
          ) : (
            <Row className="camera__wapper">
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <CameraPlayer data={currentCamera} />
                {currentCamera && currentCamera.cameraId
                  ? currentCamera.cameraId
                  : null}
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <ListCamera
                  changeCamera={this.handleChangeCamera}
                  loading={loading}
                  data={sortedItems}
                />
              </Col>
            </Row>
          )}
        </div>
      </Card>
    );
  }
}

export default withClient(
  graphql(graphQuery.queryAll, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: props => {
      return {
        error: props.data.error,
        items: (props.data.listCountPeople || {}).items || [],
        subscribeToMore: props.data.subscribeToMore,
        loading: props.data.loading
      };
    }
  })(Count),
  "clientTwo"
);
