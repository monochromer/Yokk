import {
    REPORT_API_URI
} from '../constants';


export function fetchReportData(users, startDate, endDate) {
    return {
        type: "FETCH_REPORT_DATA",
        loadItems: REPORT_API_URI + '?users=' + users + '&from=' + startDate + '&to=' + endDate
    }
}
