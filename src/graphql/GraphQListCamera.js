import gql from "graphql-tag";

export default gql`
  query listCameras {
    listCameras {
      items {
        id
        cameraId
        faceId
        datetime
        image_url
      }
    }
  }
`;
