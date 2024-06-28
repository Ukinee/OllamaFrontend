export class MessageResponse {

    constructor(
        timestamp: Date,
        senderId: string,
        id: string,
        chatName: string,
        chatRole: string,
        content: string,
        images: string[]
    ) {
        this.Timestamp = timestamp;
        this.SenderId = senderId;
        this.Id = id;
        this.ChatName = chatName;
        this.ChatRole = chatRole;
        this.Content = content;
        this.Images = images;
    }

    public Timestamp: Date;
    public SenderId: string;
    public Id: string;
    public ChatName: string;
    public ChatRole: string;
    public Content: string;
    public Images: string[];
}