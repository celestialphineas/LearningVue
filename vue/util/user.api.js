import Axios from 'axios';
import config from '../../config/path.api';
import auth from './auth.api';

var email = auth.getEmail();

Axios.defaults.headers.post['Authorization'] = auth.getAuth();
Axios.defaults.headers.put['Authorization'] = auth.getAuth();
Axios.defaults.headers.get['Authorization'] = auth.getAuth();

function getUserData() {
    return Axios.get(config.getApiHost('api/user/' + email));
}

export default {
    getUserData,
    getUserBasic() {
        return Axios.get(config.getApiHost('api/user/' + email + '/basic'));
    },
    getPinned() {   // Promise json data
        return new Promise((resolve, reject) => {
            getUserData().then((res) => {
                resolve(res.data.pinned);
            }).catch(err => reject(err));
        })
    },
    pin(word) {
        return Axios.post(config.getApiHost('api/user/' + email + '/pinned/' + word));
    },
    unpin(word) {
        return Axios.delete(config.getApiHost('api/user/' + email + '/pinned/' + word));
    },
    selectCourse(entry) {
        return Axios.post(config.getApiHost('api/user/' + email + '/course/' + entry));
    }
}