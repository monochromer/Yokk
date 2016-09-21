import axios from 'axios';

export function createUser(user) {
    console.log(user);
    axios.post('/new_user', user )
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
}
