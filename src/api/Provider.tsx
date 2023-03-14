import axios from "axios";
import { X_RapidAPI_Host, X_RapidAPI_Key } from "./Credentials";

export const BASE_URL = "https://crickbuzz-official-apis.p.rapidapi.com/";

class Provider {
  get(resource: any, params?: any | undefined, headers?: any | undefined) {
    const options = {
      method: "GET",
      url: `${BASE_URL}${resource}`,
      params: params,
      headers: headers ? headers : { "X-RapidAPI-Key": X_RapidAPI_Key, "X-RapidAPI-Host": X_RapidAPI_Host },
    };
    return axios.request(options);
  }
}

export default new Provider();
