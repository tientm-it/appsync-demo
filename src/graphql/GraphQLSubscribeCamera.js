import gql from "graphql-tag";

export default gql`
  subscription {
    onCreateCamera {
      id
      faceId
      cameraId
      datetime
      image_url
    }
  }
`;
