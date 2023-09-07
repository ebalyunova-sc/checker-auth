import axiosInstance from '../http';

export default class AuthService {
    static async login(username, password) {
        return await axiosInstance.post('/login', {username, password});
    }

    static async logout() {
        return await axiosInstance.post('/logout');
    }

    static async checkAuth() {
        return await axiosInstance.get('/check-auth');
    }
}