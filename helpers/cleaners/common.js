import axios from 'axios';
import { defaultHeader } from '../http.js';
import { endpoints } from '../config/index.js';

export const login = async (email, password) => {
    const options = {
        endpoint: `${endpoints.list.accounts.login}`,
        data: { email, password },
        config: {
            headers: defaultHeader,
        }
    };
    const loginResponse = await axios.post(options.endpoint, options.data, options.config);
    return loginResponse;
};

