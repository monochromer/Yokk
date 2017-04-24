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
        action.payload = response.data;
        return next(action);
    });
}
