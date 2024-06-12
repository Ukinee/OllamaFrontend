export class UserRequest {
    constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
    }

    public Username: string;
    public Password: string;
}
