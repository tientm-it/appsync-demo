import React from "react";
import { List, Col, Row, Skeleton } from "antd";

import Item from "./item";
import Filter from "../Filter";

import "./style.scss";

class ListCamera extends React.Component {
  _isMounted = false;

  static defaultProps = {
    loading: true
  };

  state = {
    show: "all"
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleRenderItem = item => {
    const { changeCamera } = this.props;
    if (item) {
      return <Item data={item} changeCamera={changeCamera} />;
    }
  };

  handleFilter = listCamera => {
    if (listCamera.length === 0) {
      this.setState({
        show: "all"
      });
    } else {
      this.setState({
        show: listCamera
      });
    }
  };

  render() {
    const { loading, data } = this.props;
    const { show } = this.state;
    let filterItem = data
      .map(item => item.cameraId)
      .filter((value, index, self) => self.indexOf(value) === index);
    let showData = data;
    if (show !== "all") {
      showData = showData.filter(item => show.includes(item.cameraId));
    }

    return (
      <Row>
        <Col className="list-camera">
          {loading ? (
            <Skeleton
              className="list-camera-loading"
              active={true}
              paragraph={{ rows: 4 }}
            />
          ) : (
            <div>
              <Filter data={filterItem} filter={this.handleFilter} />
              <List
                itemLayout="vertical"
                dataSource={showData}
                renderItem={this.handleRenderItem}
                className="list-camera"
              />
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default ListCamera;
