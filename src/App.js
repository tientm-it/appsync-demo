import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import Camera from "./pages/Camera";
import Count from "./pages/Count";
import Notfound from "./pages/notfound";

import "./App.scss";

const { Header, Content, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              {/* <img alt="Camhub" src={`${process.env.PUBLIC_URL}/favicon.ico`} />
              {this.state.collapsed ? `` : `CamhubSync`} */}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[
                `${window.location.pathname}`.replace("/", "") || "home"
              ]}
            >
              <Menu.Item key="home">
                <Icon type="video-camera" />
                <span>Face Recognition</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="count-people">
                <Icon type="usergroup-add" />
                <span>Count People</span>
                <Link to="/count-people" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
                style={{ margin: 10 }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Switch>
                <Route exact={true} path="/" component={Camera} />
                <Route exact={true} path="/count-people" component={Count} />
                <Route component={Notfound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
