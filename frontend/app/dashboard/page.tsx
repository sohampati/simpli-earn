"use client";

import DashboardTab from "@/components/DashboardTab";
import VideoFrame from "@/components/VideoFrame";
import SummaryFrame from "@/components/SummaryFrame";
import ChartsFrame from "@/components/ChartsFrame";
import ChatFrame from "@/components/ChatFrame";
import { useState } from "react";
import FullChat from "@/components/FullChat";

export default function Dashboard() {
  const [activeDisplay, setActiveDisplay] = useState("full");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Function to handle chat minimization
  interface ChatMinimizedHandler {
    (isMinimized: boolean): void;
  }

  const handleChatMinimized: ChatMinimizedHandler = (isMinimized) => {
    setChatMinimized(isMinimized);
    if (isMinimized) {
      setActiveDisplay("full"); // Return to full view when chat is minimized
    }
  };

  return (
    <div
      style={{
        background:
          'radial-gradient(50% 50% at 50% 50%, rgba(129, 209, 141, 0.1) 0%, rgba(217, 217, 217, 0) 100%)',
      }}
      className="font-[family-name:var(--font-geist-sans)] w-full min-h-screen relative"
    >
      {activeDisplay === "full" ? (
        <div className="w-full h-full">
          <div className="flex justify-center">
            <DashboardTab />
          </div>
          <main className="grid grid-cols-21 grid-rows-2 gap-[40px]">
            <div className="flex justify-start items-start ml-[40px] col-start-1 col-span-13 row-span-1">
              <VideoFrame />
            </div>
            <div className="flex justify-start items-start mr-[40px] -mt-[40px] col-start-14 col-span-8 row-span-2 row-start-1 max-h-[calc(100%-40px)]">
              <SummaryFrame setActiveDisplay={setActiveDisplay} halfHeight={activeDisplay !== "full"} />
            </div>
            <div className="flex justify-start items-start ml-[40px] pb-[40px] col-start-1 col-span-13 row-span-1 row-start-2 max-h-[calc(100%-40px)]">
              <ChartsFrame />
            </div>
          </main>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="flex justify-center">
            <DashboardTab />
          </div>
          {!fullscreen && <><main className="grid grid-cols-21 grid-rows-2 gap-[40px] row-end-auto">
            <div className="flex justify-start items-start ml-[40px] col-start-1 col-span-13 row-span-1 max-h-134">
              <VideoFrame />
            </div>
            <div className="flex justify-start items-start mr-[40px] -mt-[40px] col-start-14 col-span-8 row-span-1 row-start-1 max-h-[575px]">
              <SummaryFrame setActiveDisplay={setActiveDisplay} halfHeight={activeDisplay !== "full"} />
            </div>
            <div className="flex justify-start items-start ml-[40px] col-start-1 col-span-13 row-span-1 row-start-2 max-h-124 pb-[40px]">
              <ChartsFrame />
            </div>
            <div className="flex justify-start items-start mr-[40px] py-[40px] col-start-14 col-span-8 row-span-1 row-start-2 max-h-134">
              <ChatFrame 
                onMinimizedChange={handleChatMinimized}
                minimized={chatMinimized}
                setFullscreen={setFullscreen}
              />
            </div>
          </main></>}
        </div>
      )}
      {fullscreen && <FullChat setFullscreen={setFullscreen} />}
    </div>
  );
}