import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

export const callLoginService = async (email, password) => {
    try {
        await axios.post(`${SERVER_URL}/auth/login`, {email, password}, { withCredentials: true });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
};

export const callRegisterService = async (email, password) => {
    try {
        await axios.post(`${SERVER_URL}/auth/register`, {email, password}, { withCredentials: true });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
};

export const callSilentLoginService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/auth/silentlogin`, { withCredentials: true });
        return response.data;
    } catch(error) {
        console.log(error);
        return null;
    }
};

export const callLogoutService = async () => {
    try {
        await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
    } catch(error) {
        console.log(error);
    }
};