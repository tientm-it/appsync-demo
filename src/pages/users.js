import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { buildSubscription } from "aws-appsync";

const listUsers = gql`
  query listUsers {
    listUsers {
      items {
        id
        title
      }
    }
  }
`;

const onCreateUser = gql`
  subscription {
    onCreateUser {
      id
      title
    }
  }
`;

class User extends Component {
  componentDidMount = () => {
    this.props.data.subscribeToMore(buildSubscription(onCreateUser, listUsers));
  };

  render() {
    return (
      <div>
        <button>add</button>
        <button>edit</button>
        {this.props.users.map((user, index) => (
          <h2 key={index}>
            {user.id} - {user.title}
          </h2>
        ))}
      </div>
    );
  }
}

export default graphql(listUsers, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => ({
    users: props.data.listUsers ? props.data.listUsers.items : [],
    ...props
  })
})(User);
