import Axios from 'axios';
import config from '../../config/path.api';
import md5 from 'md5';

function login(email, password) {
    return new Promise((resolve, reject) =>
        Axios.post(config.getApiHost('api/auth/' + email), [md5(password)])
            .then(res => {
                if(res.status === 200) {
                    window.localStorage['email'] = res.data.email;
                    window.localStorage['token'] = res.data.token;
                    resolve('Succeeded');
                    return;
                } else {
                    reject('Wrong password'); 
                    return;
                }
            })
            .catch(error => {
                if(error.response.status === 500) {
                    reject('Sever error');
                    return;
                } else {
                    reject('Server unavailable');
                    return;
                }
            })
    );
}

export default {
    // Promise a boolean
    userExist(email) {
        return new Promise((resolve, reject) => {
            Axios.get(config.getApiHost('api/auth/' + email))
                .then(res => {
                    if(res.status === 200) resolve(true);
                    else resolve(false);
                })
                .catch(() => resolve(false));
        });
    },
    // Sync
    getEmail()  {
        if(!window.localStorage.email) return null;
        else return window.localStorage.email;
    },
    // Sync
    getAuth()   {
        if(!window.localStorage.token) return null;
        else return window.localStorage.token;
    },
    login,
    md5
}
