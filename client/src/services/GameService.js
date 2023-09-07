import axiosInstance from '../http';

export default class GameService {
    static async initGame() {
        try {
            return await axiosInstance.get('/init-game');
        } catch(e) {
            console.log(e);
        }
    }

    static async take(x1, y1, x2, y2) {
        try {
            const data = {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
            }
            return await axiosInstance.post('/take', data);
        }
        catch(e) {
            console.log(e);
        }
    }

    static async move(x1, y1, x2, y2) {
        try {
            const data = {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
            }
            return await axiosInstance.post('/move', data);
        }
        catch(e) {
            console.log(e);
        }
    }
}