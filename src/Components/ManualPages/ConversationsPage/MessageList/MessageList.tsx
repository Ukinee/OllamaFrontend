import React, {useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useMessages} from "../../../../Models/Messages/Hooks/useMessages";

export function MessageList({conversationId, refreshDialogs}: { conversationId: string, refreshDialogs: () => void }) {
    const {messages, fetchMessages, hasMore, loading} =
        useMessages(conversationId, refreshDialogs);
    
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollableDivRef.current && scrollableDivRef.current.scrollTop === 0) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messages]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <h1>Single Conversation : {conversationId}</h1>
            <div
                id="scrollableDiv"
                ref={scrollableDivRef}
                style={{
                    height: 400,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    border: '1px solid #ccc',
                    padding: '10px'
                }}
            >
                <InfiniteScroll
                    dataLength={messages.length}  // Количество элементов для определения, когда загружать новые
                    next={fetchMessages}  // Функция, вызываемая для загрузки новых данных
                    hasMore={hasMore}  // Флаг, указывающий, есть ли еще данные для загрузки
                    loader={<h4>Loading more messages...</h4>}  // Компонент, отображаемый во время загрузки
                    endMessage={<p>No more messages</p>}  // Сообщение, отображаемое в конце списка
                    scrollThreshold={0.9}  // Порог срабатывания загрузки (90% прокрутки)
                    inverse={true}  // Включаем обратную прокрутку
                    scrollableTarget="scrollableDiv"  // Связываем с контейнером прокрутки
                >
                    <div>
                        <ul>
                            <li>Messages:</li>
                            {messages.map((message, index) => (
                                <li key={message.Id}>
                                    [{index}] {message.ChatName}: {message.Content}
                                </li>
                            ))}
                        </ul>
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}
