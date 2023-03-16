import Provider from "./Provider";

export const GetFeaturedMatches = (successCallback: Function, failureCallback: Function) => {
  Provider.get("home")
    .then((response) => {
      if (response && response.data) {
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
export const GetLiveMatches = (successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/live")
    .then((response) => {
      if (response && response.data) {
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
export const GetUpcomingMatches = (successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/upcoming")
    .then((response) => {
      if (response && response.data) {
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
  Provider.get("match/" + params.matchID)
    .then((response) => {
      if (response && response.data) {
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
export const GetMatchTeams = (params: any, successCallback: Function, failureCallback: Function) => {
  Provider.get("match/" + params.matchID + "/squads")
    .then((response) => {
      if (response && response.data) {
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
export const GetMatchCommentry = (params: any, successCallback: Function, failureCallback: Function) => {
  Provider.get("match/" + params.matchID + "/commentary")
    .then((response) => {
      if (response && response.data) {
        successCallback(response, params.type);
      } else {
        failureCallback(response.statusText);
      }
    })
    .catch((ex) => {
      console.log(ex);
      failureCallback(ex);
    });
};
