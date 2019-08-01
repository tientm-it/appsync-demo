import gql from "graphql-tag";

// export const createCamera = gql`
//   mutation CreateCamera($input: CreateCameraInput!) {
//     createCamera(input: $input) {
//       id
//       faceId
//       datetime
//       encoded_image
//     }
//   }
// `;
export const createCamera = gql`
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

export const updateCamera = gql`
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

export const deleteCamera = gql`
  mutation DeleteCamera($input: DeleteCameraInput!) {
    deleteCamera(input: $input) {
      id
    }
  }
`;
