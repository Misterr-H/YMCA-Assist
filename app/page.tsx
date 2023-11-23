'use client';

import Image from 'next/image'
import RightChatBubble from "@/components/RightChatBubble";
import LeftChatBubble from "@/components/LeftChatBubble";
import MessageEntry from "@/components/MessageEntry";
import React from "react";

export default function Home() {
  const [messages, setMessages] = React.useState([]);

  const apiUrl = 'http://localhost:3000/api/botReply?question=';

    const onSend = async (text: string) => {
        const newMessages = [...messages, { text, type: "sent", time: new Date().toLocaleTimeString() }];
        setMessages(newMessages as any);
        const response = await fetch(apiUrl + text);
        const data = await response.json();
        const newMessagesWithReply = [...newMessages, { text: data.message, type: "received", time: data.time }];
        setMessages(newMessagesWithReply as any);
    };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow border-r border-gray-300">
        <div className="flex flex-col flex-grow p-4">
          <div className="flex flex-row items-center p-4">
            <div className="flex flex-row items-center mx-auto">
              <div className="flex flex-row justify-center items-center">
                <Image src={"/ymca.png"} width={50} height={50} alt={"YMCA Assist"} />
                <p className=" text-xl font-semibold ml-5">YMCA Assist</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto w-2/3 mx-auto">
            {messages.map((message: any, index: any) => {
                if (message.type === "sent") {
                    return (
                    <RightChatBubble
                        key={index}
                        message={message.text}
                        time={message.time}
                    />
                    );
                } else {
                    return <LeftChatBubble key={index} message={message.text} />;
                }
            }
            )}
          </div>
          <MessageEntry onSend={onSend} />
        </div>
      </div>
    </div>
  )
}


