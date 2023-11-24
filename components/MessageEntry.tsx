'use client';

import React from "react";

const MessageEntry = ({ onSend }: any) => {
    const [text, setText] = React.useState("");
    const [isSending, setIsSending] = React.useState(false);
    const handleSend = async () => {
        if (text === "") {
            return;
        }
        setIsSending(true);
        await onSend(text);
        setIsSending(false);
        setText("");
    };
    return (
        <div className="flex flex-row items-center p-4">
            <input
                type="text"
                className="flex-grow text-black border-2 border-gray-300 rounded-full py-2 px-4 mr-4 focus:outline-none focus:border-indigo-500"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />
            <button
                className="bg-indigo-500 text-white font-semibold px-8 py-2 rounded-full"
                onClick={handleSend}
                disabled={isSending}
            >
                Send
            </button>
        </div>
    );
};

export default MessageEntry;
