import AuthService from "../services/AuthService";

export default class Store {
    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('auth', true);
            localStorage.setItem('user', response.data.user.username);
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.checkAuth();
        } catch (e) {
            console.log(e.response?.data?.message);
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } 
    }
}