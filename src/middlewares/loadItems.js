import axios from 'axios'

export default (store) => (next) => (action) => {
  if(!action.loadItems) return next(action);

  if(action.type === "FETCH_REDMINE_TIME_ENTRIES") {
    next({type: "ALERT_SHOW", text: "Redmine sync is started. Wait a minute, please...", class: "info"});
  }

  axios.get(action.loadItems).then((response) => {
    if(action.type === "FETCH_REDMINE_TIME_ENTRIES") {
      next({type: "ALERT_SHOW", text: "Redmine sync done succesfully!", class: "success"});
    }
    if(action.type === "FETCH_CURRENT_USER"){
      next({
        type: "FETCH_COMPANIES",
        payload: response.data.companies
      });
      next({
        type: "FETCH_TEAMS",
        data: response.data.teams
      });
    }
    action.payload = response.data;
    return next(action);
  }, (err) => {
    if(
      action.type === "FETCH_CURRENT_USER" &&
      err.response.status === 401
    ){
      localStorage.removeItem('jwtToken');
      window.location = "/";
    }
  });
}
