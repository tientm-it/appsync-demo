import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

import * as serviceWorker from "./serviceWorker";
import AppSyncConfig from "./aws-exports";
import App from "./App";

import "./index.css";
// ant lib
import "antd/dist/antd.css";
import "./resources/_antd.less"; // redefinition AntDesign variables

const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
