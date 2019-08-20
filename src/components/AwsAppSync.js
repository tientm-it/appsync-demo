import React from "react";

import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

import AppSyncConfig from "../aws-exports";

export default function(ComposedComponent, appName) {
  const client = new AWSAppSyncClient({
    url: AppSyncConfig[appName].graphqlEndpoint,
    region: AppSyncConfig[appName].region,
    auth: {
      type: AppSyncConfig[appName].authenticationType,
      apiKey: AppSyncConfig[appName].apiKey
    },
    disableOffline: true
  });

  class AwsAppSync extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <Rehydrated>
            <ComposedComponent />
          </Rehydrated>
        </ApolloProvider>
      );
    }
  }

  return AwsAppSync;
}
