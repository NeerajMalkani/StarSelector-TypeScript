import axios from "axios";

const BASE_URL = "https://unofficial-cricbuzz.p.rapidapi.com/";

class Provider {
  get(resource: any, params?: any | undefined, headers?: any | undefined) {
    const options = {
      method: "GET",
      url: `${BASE_URL}${resource}`,
      params: params,
      headers: headers,
    };
    return axios.request(options);
  }
}

export default new Provider();
