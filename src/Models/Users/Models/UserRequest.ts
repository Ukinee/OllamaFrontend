export class UserRequest {
    constructor(username: string, password: string) {
        this.userName = username;
        this.password = password;
    }

    public userName: string;
    public password: string;
}
