import Axios from 'axios';
import config from '../../config/path.api';

export default {
    // Return a promise
    getWordData(word) {
        if(!word || typeof word !== 'string')
            return null;
        else {
            return Axios.get(config.getApiHost('api/data/word/' + word));
        }
    },
    getRandom(int) {
        if(typeof int !== 'number') return null;
        return Axios.get(config.getApiHost('api/data/random/') + int);
    }
}
