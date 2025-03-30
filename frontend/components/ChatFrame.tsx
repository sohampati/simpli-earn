"use client";

import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import ChatBot from "./ChatBot";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";

interface ChatFrameProps {
    onMinimizedChange: (minimized: boolean) => void;
    minimized: boolean;
}

export default function ChatFrame({ onMinimizedChange, minimized }: ChatFrameProps) {
    const [fullscreen, setFullscreen] = useState(false);
    // Remove local minimized state since we're using props now

    // Sync local UI with parent's minimized state
    useEffect(() => {
        if (minimized) {
            setFullscreen(false);
        }
    }, [minimized]);

    const handleMinimize = () => {
        onMinimizedChange(true); // Notify parent
        onMinimizedChange(false); // Notify parent
    };

    const handleExpand = () => {
        onMinimizedChange(false); // Notify parent
        setFullscreen(true);
    };

    if (fullscreen) {
        return (
            <div className="flex flex-col w-full h-full relative">
                <div className="grid grid-cols-[1fr_400px_1fr] relative justify-between">
                    {/* SimpliChat Button */}
                    <div
                        className="flex justify-start items-start rounded-tl-[30px] rounded-tr-[23px] w-full h-[40px] border-t-[0.85px] border-white/35 relative"
                    >
                    </div>

                    <div
                        className="flex justify-end items-end rounded-b-[23px] w-full h-[40px] border-b-[0.85px] border-white/35 relative"
                    >
                    </div>

                    {/* Close Button */}
                    <button
                        className="flex justify-start items-start rounded-tr-[30px] rounded-tl-[23px] w-full h-[40px] border-t-[0.85px] border-white/35 cursor-pointer relative"
                        onClick={() => setFullscreen(false)}
                    >
                        <h1 className="flex justify-end items-center font-bold text-sm font-montserrat w-full h-full text-white opacity-50">
                            <IoClose size={30} className="mt-4 mr-4" />
                        </h1>
                    </button>

                    {/* Pseudo-Element Overlay to Seamlessly Blend the Borders */}
                    <div className="absolute top-1/2 left-1/2 w-[0.5px] h-[18px] bg-white/12 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transform -rotate-20"></div>
                </div>

                <div className="flex w-full min-h-[83vh]">
                    <div className="w-1/4 -mt-10 border-white/35 border-x-[0.85px] border-b-[0.85px] bg-white/12 rounded-l-[30px] hidden lg:block">
                        <div className="w-full flex justify-between p-5">
                            <FaCompressAlt className="cursor-pointer z-100" size={20} onClick={() => setFullscreen(false)} />
                            <p className="text-lg font-bold">SimpliChat</p>
                        </div>

                        <div className="p-5">
                            <p className="mb-2"><b>New Chat +</b></p>
                            <p>chat history</p>
                        </div>
                    </div>
                    <div className="-mt-10 pt-18 pb-12 px-8 w-full lg:w-3/4 rounded-r-[30px] rounded-l-[30px] lg:rounded-l-none border-b-[0.85px] border-x-[0.85px] border-white/35"><div className="relative h-full"><ChatBot /></div></div>
                </div>
            </div>
        );
    }

    if (minimized) {
        return null; // Or render a minimized chat button
    }

    return (
        <div className="bg-white/4 text-white rounded-[30px] w-full h-full border-[1px] border-white/25 p-5">
            <div className="relative w-full h-full">
                <div className="flex justify-between">
                    <FaExpandAlt className="cursor-pointer" size={20} onClick={handleExpand} />
                    <h1 className="font-bold text-lg">SimpliChat</h1>
                    <IoClose size={25} className="cursor-pointer" onClick={handleMinimize} />
                </div>
                <ChatBot />
            </div>
        </div>
    );
}