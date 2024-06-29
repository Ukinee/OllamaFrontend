export class UserResponse{
    public id: string;
    public username: string;
    public token: string;
    public conversationIds: string[];
    
    constructor(id: string, username: string, token: string, conversationIds: string[]) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.conversationIds = conversationIds;
    }
}