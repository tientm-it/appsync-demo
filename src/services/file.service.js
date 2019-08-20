import axios from "axios";

const HOST = "http://3.1.100.222:3000";

export const getFile = (moduleName, fileName) => {
  if (!fileName || typeof fileName !== "string") {
    return undefined;
  }
  console.log(moduleName, fileName);

  return axios.get(`${HOST}/image`, {
    params: {
      fileName,
      moduleName
    }
  });
};
