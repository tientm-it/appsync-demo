import React from "react";
import { Select } from "antd";

const { Option } = Select;

class Filter extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Select
        mode="multiple"
        placeholder="Please select"
        onChange={this.props.filter}
        style={{ width: "100%" }}
        allowClear={true}
      >
        {data.map(item => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    );
  }
}

export default Filter;
