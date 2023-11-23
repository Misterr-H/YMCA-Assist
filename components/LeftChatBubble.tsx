const LeftChatBubble = ({ message }: any) => {
    return (
        <div className="flex flex-row">
        <div className="flex flex-col bg-gray-300 rounded-lg p-2 max-w-xs">
            <p className="text-black text-sm">{message}</p>
        </div>
        </div>
    );
}

export default LeftChatBubble;
