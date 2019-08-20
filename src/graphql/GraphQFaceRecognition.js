import gql from "graphql-tag";

const queryAll = gql`
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

const subscribe = gql`
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

const createCamera = gql`
  mutation CreateCamera($input: CreateCameraInput!) {
    createCamera(input: $input) {
      id
      cameraId
      faceId
      datetime
      image_url
    }
  }
`;

const updateCamera = gql`
  mutation UpdateCamera($input: UpdateCameraInput!) {
    updateCamera(input: $input) {
      id
      cameraId
      faceId
      datetime
      image_url
    }
  }
`;

const deleteCamera = gql`
  mutation DeleteCamera($input: DeleteCameraInput!) {
    deleteCamera(input: $input) {
      id
    }
  }
`;

export default {
  queryAll,
  subscribe,
  createCamera,
  updateCamera,
  deleteCamera
};
