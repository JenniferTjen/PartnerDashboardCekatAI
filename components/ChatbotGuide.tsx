import React, { useRef, useState } from 'react';
import IconSend from './Icon/IconSend';
import IconMoodSmile from './Icon/IconMoodSmile';
import IconMenu from './Icon/IconMenu';
import IconReset from './Icon/IconReset';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { createAiMessage } from '@/store/chatbotSlice';

const ChatbotGuide = () => {
    const dispatch = useDispatch();
    const scrollToRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [textMessage, setTextMessage] = useState('');
    const sendMessageHandle = (event: any) => {
        // Check if 'Enter' key is pressed without the 'Shift' key
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default 'Enter' action
            sendMessage(); // Call your function to send the message
        }
    };
    const sendMessage = () => {
        // if (textMessage.trim() !== '') {
        //     const newMessage = {
        //         id: new Date().getTime().toString(),
        //         message: textMessage,
        //         media_type: 'text',
        //         sent_by: 'user',
        //     };
        //     const updatedMessages = [...messages, newMessage];
        //     setMessages(updatedMessages);
        //     const historyWithoutLatest = messages;
        //     console.log({ id: data.id, query: textMessage, messages: historyWithoutLatest });
        //     dispatch<any>(createAiMessage({ id: data.id, query: textMessage, messages: historyWithoutLatest })).then((response) => {
        //         console.log(response);
        //         const newAiMessage = {
        //             id: new Date().getTime().toString(),
        //             message: response.payload.data.ai_message,
        //             media_type: 'text',
        //             sent_by: 'ai',
        //         };
        //         let newMessages = [...updatedMessages, newAiMessage];
        //         if (response.payload.data.handoff_to_agent) {
        //             newMessages.push({
        //                 id: new Date().getTime().toString(),
        //                 message: 'System: Handoff to Agent',
        //                 media_type: 'text',
        //                 sent_by: 'system',
        //             });
        //         }
        //         setMessages(newMessages);
        //     });
        //     setTextMessage('');
        // }
    };
    const renderChatBox = ({ message }) => {
        const renderMedia = () => {
            if (message.media_type === 'text') {
                return <p style={{ whiteSpace: 'pre-wrap' }}>{message.message}</p>;
            } else if (message.media_type === 'image') {
                return <img src={message.media_url} width={200} height={200} alt="preview image" />;
            }
        };

        return (
            <div key={message?.id} id={message?.id} ref={scrollToRef}>
                <div className={`flex items-start gap-3 ${message?.sent_by === 'system' ? 'justify-center' : message?.sent_by === 'user' ? 'justify-end' : ''}`}>
                    <div
                        className={`max-w-[350px] rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 sm:max-w-[550px] ${
                            message?.sent_by === 'system'
                                ? 'bg-transparent'
                                : message?.sent_by === 'user'
                                ? '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                : 'ltr:rounded-bl-none rtl:rounded-br-none'
                        }`}
                    >
                        {renderMedia()}
                        {message?.message && message?.media_url ? <p className="mt-2">{message?.message}</p> : null}
                    </div>
                </div>
            </div>
        );
    };

    const resetMessages = () => {
        setMessages([]);
    };
    const MemoizedChatBox = React.memo(renderChatBox);

    return (
        <div>
            <div className={`flex flex-1 flex-col transition-all duration-300`}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="mx-3">
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-lg font-semibold">{`name`}</p>
                                <p className="text-lg font-semibold">{`model`}</p>
                            </div>
                            <p className="text-xs capitalize text-white-dark">{'description'}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <button className="flex items-center justify-center rounded-md border-[1px] bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-700" onClick={resetMessages}>
                            <IconReset className="text-white" />
                        </button>
                    </div>
                </div>
                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                <PerfectScrollbar id="container" className="chat-conversation-box relative h-[calc(100vh-_540px)]">
                    <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                        <div className="m-6 mt-0 block">
                            <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                                <span className="relative top-2 bg-white px-3 dark:bg-black">Today</span>
                            </h4>
                        </div>
                        {messages?.map((message) => (
                            <MemoizedChatBox key={message?.id} message={message} />
                        ))}
                    </div>
                </PerfectScrollbar>
                <div className="bottom-0 left-0 mt-2 w-full border-t border-gray-200 p-4">
                    <div className="w-full items-center space-x-3  rtl:space-x-reverse sm:flex ">
                        <div className="relative flex-1">
                            <div className={`form-input rounded-lg border-0  bg-[#f4f4f4] px-12 py-2`}>
                                {true ? (
                                    <textarea
                                        className="w-full resize-none border-0 bg-[#f4f4f4] caret-black focus:outline-none" // Added w-full for full width
                                        placeholder="Type a message"
                                        value={textMessage}
                                        onChange={(e) => setTextMessage(e.target.value)}
                                        onKeyDown={sendMessageHandle}
                                        rows={1}
                                        style={{ overflowY: 'auto', height: 'auto', maxHeight: '150px' }}
                                        onInput={(e) => {
                                            e.target.style.height = 'inherit';
                                            if (e.target.scrollHeight > e.target.clientHeight) {
                                                e.target.style.height = `${e.target.scrollHeight}px`;
                                            }
                                        }}
                                    />
                                ) : null}
                            </div>
                            {true ? (
                                <>
                                    <button type="button" className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:left-4 rtl:right-4">
                                        <IconMoodSmile />
                                    </button>
                                    <button
                                        type="button"
                                        className={`${true ? 'text-gray-500' : ''} absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-4 rtl:left-4`}
                                        onClick={() => sendMessage()}
                                    >
                                        <IconSend />
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotGuide;
