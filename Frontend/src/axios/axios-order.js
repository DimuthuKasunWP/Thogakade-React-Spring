import axios from 'axios';
import * as axiosType from './axios-public';

const instance=axios.create({
    baseURL:axiosType.PUBLIC_URL

});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
