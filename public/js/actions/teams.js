import { TEAM_CRUD } from '../constants'

export function step0(email) {
    return {
        type: "STEP_0",
        createItem: {
            url: TEAM_CRUD,
            data: {
                email: email,
                step: 0
            }
        }
    }
}

export function step1(code) {
    return {
        type: "STEP_1",
        createItem: {
            url: TEAM_CRUD,
            data: {
                code: code,
                step: 1
            }
        }
    }
}