import { TEAM_CRUD } from '../constants'

export function step0(email) {
    return {
        type: "STEP_0",
        createItem: {
            url: TEAM_CRUD,
            data: { email: email }
        }
    }
}