"use client";

import { TbSend2 } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function ChatBot({ tall = false }: { tall?: boolean }) {
    const messageArray = [
        {
            id: 1,
            sender: "user",
            text: "Is now a good time to invest in Tesla?"
        },
        {
            id: 2,
            sender: "bot",
            text: "The decision to invest in the stock market depends on various factors, including your financial goals, risk tolerance, and market conditions. Historically, markets tend to rise over the long term, but short-term fluctuations are common. Diversification and a well-thought-out strategy can help manage risk.\n\nIf you're unsure, consulting a financial advisor or conducting thorough research on economic indicators, interest rates, and company performance may be beneficial before making investment decisions."
        }
    ];
    const [messages, setMessages] = useState(messageArray);
    const [userInput, setUserInput] = useState("");
    
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (userInput.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: "user",
                text: userInput
            };
            setMessages([...messages, newMessage]);

            // Mock bot response
            setTimeout(() => {
                const botMessage = {
                    id: messages.length + 2,
                    sender: "bot",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia est at malesuada semper."
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 1000);
        }
        setUserInput("");
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                return;
            } else {
                e.preventDefault();
                sendMessage();
            }
        }
    };

    return (
        <>
            <div className={`grid grid-cols-1 grid-rows-2 gap-0 ${tall ? "max-h-160" : "max-h-120"}`}>
                <div className="flex row-start-1 row-span-1 overflow-auto" ref={messageContainerRef} style={{ scrollbarColor: '#ffffff9f #ffffff00' }}>
                    <div className="">
                        {messages.map((message) => (
                            <Message key={message.id} text={message.text} sender={message.sender} />
                        ))}
                    </div>
                </div>
                <div className="flex row-start-2 row-span-1">
                    <div className="absolute w-full bottom-5 flex flex-col items-end">
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Message RAG Chatbot"
                            onKeyDown={handleKeyDown}
                            className="w-full h-[120px] p-3 bg-white/4 text-white rounded-[15px] border-[1px] border-white/25 resize-none"
                        ></textarea>
                        <div
                            className="-mt-13 mr-3 py-1.5 px-3 bg-white/15 text-white rounded-full border-[1px] border-white/25 cursor-pointer"
                            onClick={sendMessage}
                        >
                            <TbSend2 size={25} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}