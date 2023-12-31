'use client';

import Image from 'next/image'
import RightChatBubble from "@/components/RightChatBubble";
import LeftChatBubble from "@/components/LeftChatBubble";
import MessageEntry from "@/components/MessageEntry";
import React from "react";

export default function Home() {
  const [messages, setMessages] = React.useState([]);
  const messagesEndRef = React.useRef(null);

  // const apiUrl = 'http://localhost:3000/api/botReply?question=';
  const apiUrl = 'https://ymca-assist.vercel.app/api/botReply?question=';
    const onSend = async (text: string) => {
        const newMessages = [...messages, { text, type: "sent", time: new Date().toLocaleTimeString() }];
        setMessages(newMessages as any);
        const response = await fetch(apiUrl + text);
        const data = await response.json();
        const newMessagesWithReply = [...newMessages, { text: data.message, type: "received", time: data.time }];
        setMessages(newMessagesWithReply as any);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow border-r border-gray-300">
        <div className="flex flex-col flex-grow p-4">
          <div className="flex flex-row items-center p-4">
            <div className="flex flex-row items-center mx-auto sticky top-0">
              <div className="flex flex-row justify-center items-center">
                <Image src={"/ymca.png"} width={50} height={50} alt={"YMCA Assist"} />
                <p className=" text-xl font-semibold ml-5">YMCA Assist</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-y-scroll w-2/3 mx-auto h-[90%] scrollbar-hide">
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
              <div ref={messagesEndRef} />
          </div>
            <div className={'sticky bottom-0 bg-black'}>
                <MessageEntry onSend={onSend} />
            </div>
        </div>
      </div>
    </div>
  )
}


