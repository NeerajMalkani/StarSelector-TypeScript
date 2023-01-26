import Provider from "./Provider";

export const GetUpcomingMatches = (successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/list", { matchState: "upcoming" })
    .then((response) => {
      if (response && response.data) {
        successCallback(response, 1);
      } else {
        failureCallback(response.statusText);
      }
    })
    .catch((ex) => {
      console.log(ex);
      failureCallback(ex);
    });
};

export const GetLiveMatches = (successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/list", { matchState: "live" })
    .then((response) => {
      if ((response && response.data, 2)) {
        successCallback(response);
      } else {
        failureCallback(response.statusText);
      }
    })
    .catch((ex) => {
      console.log(ex);
      failureCallback(ex);
    });
};

export const GetMatchInfo = (params: any, successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/get-info", { matchId: params.matchID })
    .then((response) => {
      if ((response && response.data, 2)) {
        successCallback(response);
      } else {
        failureCallback(response.statusText);
      }
    })
    .catch((ex) => {
      console.log(ex);
      failureCallback(ex);
    });
};
