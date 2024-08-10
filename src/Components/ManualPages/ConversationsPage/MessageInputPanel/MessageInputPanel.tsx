import React, {useState} from 'react';
import {MessageService} from '../../../../Models/Messages/Services/MessageService';

interface MessageInputPanelProps {
    conversationId: string;
}

export function MessageInputPanel({conversationId}: MessageInputPanelProps) {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!content.trim()) {
            setError('Message content cannot be empty');
            return;
        }

        setLoading(true);
        setError(null);
        const conversationService = new MessageService();

        try {
            const response = await conversationService.PostMessage(conversationId, content, images);
            setContent('');
            setImages([]);
        } catch (error) {
            console.error('Failed to send message:', error);
            setError('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="message-input-panel">
            {error && <div className="error-message">{error}</div>}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message here..."
                disabled={loading}
            />
            <button onClick={handleSendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
}
