'use client';

const RightChatBubble = ({ message, time }: any) => {
    return (
        <div className="flex flex-row-reverse">
        <div className="flex flex-col bg-blue-500 rounded-lg p-2 max-w-xs">
            <p className="text-white text-sm">{message}</p>
            <p className="text-gray-400 text-xs">{time}</p>
        </div>
        </div>
    );
}


export default RightChatBubble;
