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
  Provider.get("home")
    .then((response) => {
      console.log(response);
      if (response && response.data) {
        successCallback(response, 2);
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
  Provider.get("matches/get-team", { matchId: params.matchID, teamId: params.teamID })
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

export const GetMatchOvers = (params: any, successCallback: Function, failureCallback: Function) => {
  Provider.get("matches/get-overs", { matchId: params.matchID })
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
