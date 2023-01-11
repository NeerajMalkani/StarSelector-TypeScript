import { X_RapidAPI_Host, X_RapidAPI_Key } from "../api/Credentials";
import { BASE_URL } from "../api/Provider";

const FetchImage = (imageID: number) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": X_RapidAPI_Key,
      "X-RapidAPI-Host": X_RapidAPI_Host,
    },
  };
  return fetch( BASE_URL + "get-image?id=" + imageID + "&p=thumb", options).then((response) => response.blob());
};

const GetAllPromises = (id: any) => {
  const allPromises = Promise.all([FetchImage(id)]);
  return allPromises;
};

export const GetImageFromID = (id: any, callback: any) => {
  GetAllPromises(id).then(([response]) => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(response);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      callback(base64data, id);
    };
  });
};
