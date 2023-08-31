module.exports = class UserDto {
    id;
    username;

    constructor(user) {
        this.id = user.id;
        this.username = user.username;
    }
}