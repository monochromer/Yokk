import { TEAM_CRUD } from '../constants'
import axios from 'axios'

export function step0(email) {
    return {
        type: "STEP_0",
        createItem: {
            url: TEAM_CRUD,
            data: {
                email: email,
                step: '0'
            }
        }
    }
}

export function step1(code, email) {
    console.log(arguments);
    return {
        type: "STEP_1",
        createItem: {
            url: TEAM_CRUD,
            data: {
                code: code,
                email: email,
                step: '1'
            }
        }
    }
}


export function step2(login) {
    return {
        type: "STEP_2",
        login: login
    }
}

export function step3(password) {
    return {
        type: "STEP_3",
        password: password
    }
}

export function step4(teamName, email) {
    return {
        type: "STEP_4",
        teamName: teamName,
        createItem: {
            url: TEAM_CRUD,
            data: {
                name: teamName,
                email: email,
                step: '4'
            }
        }
    }
}

export function step5(teamName, addMembers) {
    return {
        type: "STEP_5",
        updateItem: {
            url: TEAM_CRUD + teamName,
            data: {
                addMembers: addMembers,
                step: 5
            }
        }
    }
}

export function authUser(login, password) {
    return function(dispatch) {
        axios.post('/login', {username: login, password: password});
        console.log(login + password);
    }
}
