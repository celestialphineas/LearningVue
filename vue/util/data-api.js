import Axios from 'axios';
import config from '../../config/path.api.js';

export default {
    // Return a promise
    getWordData(word) {
        if(!word || typeof word !== 'string')
            return null;
        else {
            return Axios.get(config.getApiHost('api/data/' + word));
        }
    }
}
