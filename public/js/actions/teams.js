import { TEAM_CRUD } from '../constants'

export function step0(email) {
    return {
        type: "CREATE_TEAM",
        createItem: {
            url: TEAM_CRUD,
            data: { email: email }
        }
    }
}