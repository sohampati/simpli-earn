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

      <div className="w-full h-full">
        <div className="flex justify-center">
          <DashboardTab />
        </div>
        {!fullscreen &&
          <main className="grid grid-cols-1 lg:grid-cols-[62%_1fr] xl:grid-cols-[62%_1fr] gap-[40px] px-[40px] pb-[40px] max-w-[1800px] m-auto">
            <div className="flex flex-col gap-[40px]">
              <VideoFrame />
              <div className="w-full grow min-h-[300px]">
                <ChartsFrame />
              </div>
            </div>
            <div className="flex flex-col gap-[40px] -mt-[40px] sm:max-h-[1100px]">
              <div className={`${activeDisplay == "full" ? "h-full" : "h-2/5 xl:h-1/2"}`}><SummaryFrame setActiveDisplay={setActiveDisplay} halfHeight={activeDisplay !== "full"} /></div>
              {!fullscreen && !(activeDisplay == "full") && <div className="grow"><ChatFrame
                onMinimizedChange={handleChatMinimized}
                minimized={chatMinimized}
                setFullscreen={setFullscreen}
              /></div>}
            </div>
          </main>
        }
      </div>

      {fullscreen && <FullChat setFullscreen={setFullscreen} onMinimizedChange={handleChatMinimized} />}
    </div>
  );
}