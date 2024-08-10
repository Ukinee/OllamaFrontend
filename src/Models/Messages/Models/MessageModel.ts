export class MessageModel {

    constructor(
        timestamp: Date,
        id: string,
        chatName: string,
        content: string,
    ) {
        this.Timestamp = timestamp;
        this.Id = id;
        this.ChatName = chatName;
        this.Content = content;
    }

    public Timestamp: Date;
    public Id: string;
    public ChatName: string;
    public Content: string;
}