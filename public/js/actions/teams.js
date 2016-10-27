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

export function step1(code, email) {
    return {
        type: "STEP_1",
        createItem: {
            url: TEAM_CRUD,
            data: {
                code: code,
                email: email,
                step: 1
            }
        }
    }
}


export function step2(username) {
    return {
        type: "STEP_2",
        username: username
    }
}

export function step3(password) {
    return {
        type: "STEP_3",
        password: password
    }
}

export function step4(teamName) {
    return {
        type: "STEP_4",
        teamName: teamName
    }
}