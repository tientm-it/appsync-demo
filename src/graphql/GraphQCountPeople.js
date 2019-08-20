import gql from "graphql-tag";

const queryAll = gql`
  query listCountPeople {
    listCountPeople {
      items {
        id
        cameraId
        datetime
        faceId
        image_url
      }
    }
  }
`;

const subscribe = gql`
  subscription {
    onCreateCountPeople {
      id
      faceId
      cameraId
      datetime
      image_url
    }
  }
`;

export default {
  queryAll,
  subscribe
};
