import React, { Component } from "react";
import { graphql } from "react-apollo";
import { buildSubscription } from "aws-appsync";

import ListCamera from "../../graphql/GraphQListCamera";
import SubscribeCamera from "../../graphql/GraphQLSubscribeCamera";
import CameraItem from "./CameraItem";
import { List } from "antd";

import "./style.css";

class Camera extends Component {
  componentDidMount = () => {
    this.props.subscribeToMore(buildSubscription(SubscribeCamera, ListCamera));
  };

  render() {
    console.log("render");
    // const { error, listCameras } = this.props.data;
    // const { items = [] } = listCameras || {};
    const { error, items } = this.props;
    const sortedItems = items.sort((a, b) => {
      if (Date.parse(a.datetime) < Date.parse(b.datetime)) return 1;
      if (Date.parse(a.datetime) > Date.parse(b.datetime)) return -1;
      return 0;
    });

    return (
      <div className="camera-wapper">
        {error ? (
          <div>An unexpected error happened : {error}</div>
        ) : (
          <List
            className="list-item"
            size="large"
            grid={{
              gutter: 8,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 3
            }}
            dataSource={sortedItems}
            renderItem={item => (
              <List.Item>
                <CameraItem key={item.id} item={item} />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default graphql(ListCamera, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => {
    return {
      error: props.data.error,
      items: props.data.listCameras.items || [],
      subscribeToMore: props.data.subscribeToMore
    };
  }
})(Camera);
