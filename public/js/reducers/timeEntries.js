import _ from 'lodash'
import moment from 'moment'
const defaultState = {
    list: [],
    helpers: {
        allBatches: false
    }
}

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case "CREATE_TIME_ENTRY":
            return Object.assign({}, state, { list: state.list.concat(payload) });
            break;

        case "FETCH_NEXT_TIME_ENTRY_BATCH":
            let allBatches = (payload.length == 0 || payload.lenght < 10) ? true : false;
            return Object.assign({}, state, {
                list: state.list.concat(payload),
                helpers: { allBatches: allBatches } 
            });
            break;

        case "FETCH_REDMINE_TIME_ENTRIES":
            const withoutRedmine = _.filter(state.list, (el) => el.entrySource != "redmine");
            return Object.assign({}, state, { list: withoutRedmine.concat(payload) });
            break;

        case "DELETE_TIME_ENTRY":
            let withoutDeleted =  _.filter(state.list, (el) => el._id != payload.taskId);
            return Object.assign({}, state, { list: withoutDeleted });
            break;

        case "UPDATE_TIME_ENTRY":
            let withoutUpdated = _.filter(state.list, (o) => o._id != payload._id);
            return Object.assign({}, state, { list: withoutUpdated.concat(payload) });

        default:
            return state;
    }
}
