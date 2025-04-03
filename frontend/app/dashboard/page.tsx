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
  const [timestamp, setTimestamp] = useState<number>(0);

  const messageArray = [
    {
      id: 1,
      sender: "user",
      text: "Is now a good time to invest in Tesla?",
    },
    {
      id: 2,
      sender: "bot",
      text: "The decision to invest in the stock market depends on various factors, including your financial goals, risk tolerance, and market conditions. Historically, markets tend to rise over the long term, but short-term fluctuations are common. Diversification and a well-thought-out strategy can help manage risk.\n\nIf you're unsure, consulting a financial advisor or conducting thorough research on economic indicators, interest rates, and company performance may be beneficial before making investment decisions.",
    },
  ];

  const sentimentData = {
    10: 0.2, // 10s → Sentiment: 0.2
    50: -0.8, // 50s → Sentiment: -0.8
    180: 0.1, // 3m → Sentiment: 0.1
    300: -0.5, // 5m → Sentiment: -0.5
    420: 0.4, // 7m → Sentiment: 0.4
    540: -0.7, // 9m → Sentiment: -0.7
    660: 0.3, // 11m → Sentiment: 0.3
    780: -0.6, // 13m → Sentiment: -0.6
    900: 0.9, // 15m → Sentiment: 0.9
    1020: -0.2, // 17m → Sentiment: -0.2
    1140: 0.4, // 19m → Sentiment: 0.4
    1260: -0.3, // 21m → Sentiment: -0.3
    1380: 0.6, // 23m → Sentiment: 0.6
    1500: -0.8, // 25m → Sentiment: -0.8
    1620: 0.5, // 27m → Sentiment: 0.5
    1740: -0.7, // 29m → Sentiment: -0.7
    1860: 0.1, // 31m → Sentiment: 0.1
    1980: -0.3, // 33m → Sentiment: -0.3
    2100: 0.9, // 35m → Sentiment: 0.9
    2220: -0.2, // 37m → Sentiment: -0.2
    2340: 0.4, // 39m → Sentiment: 0.4
    2460: -0.3, // 41m → Sentiment: -0.3
    2580: 0.6, // 43m → Sentiment: 0.6
    2700: -0.8, // 45m → Sentiment: -0.8
    2820: 0.5, // 47m → Sentiment: 0.5
    2940: -0.7, // 49m → Sentiment: -0.7
    3060: 0.1, // 51m → Sentiment: 0.1
    3180: -0.3, // 53m → Sentiment: -0.3
    3300: 0.9, // 55m → Sentiment: 0.9
    3420: -0.2, // 57m → Sentiment: -0.2
    3540: 0.4, // 59m → Sentiment: 0.4
    3660: -0.3, // 61m → Sentiment: -0.3
    3780: 0.6, // 63m → Sentiment: 0.6
    3900: -0.8, // 65m → Sentiment: -0.8
    4020: 0.5, // 67m → Sentiment: 0.5
    4140: -0.7, // 69m → Sentiment: -0.7
    4260: 0.1, // 71m → Sentiment: 0.1
    4380: -0.3, // 73m → Sentiment: -0.3
  };

  const [messages, setMessages] = useState(messageArray);

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
          "radial-gradient(50% 50% at 50% 50%, rgba(129, 209, 141, 0.1) 0%, rgba(217, 217, 217, 0) 100%)",
      }}
      className="font-[family-name:var(--font-geist-sans)] w-full min-h-[calc(100vh-57px)] relative"
    >
      <div className="w-full h-full">
        <div className="flex justify-center">
          <DashboardTab />
        </div>
        {!fullscreen && (
          <main className="grid grid-cols-1 lg:grid-cols-[62%_1fr] xl:grid-cols-[62%_1fr] gap-[40px] px-[40px] pb-[30px] max-w-[1536px] m-auto">
            <div className="flex flex-col gap-[40px]">
              <VideoFrame timestamp={timestamp} />
              <div className="w-full grow min-h-[450px]">
                <ChartsFrame sentimentData={sentimentData} onTimestampClick={setTimestamp} />
              </div>
            </div>
            <div className="flex flex-col gap-[40px] -mt-[40px] sm:max-h-[1100px]">
              <div className={`h-[500px] ${activeDisplay == "full" ? "lg:h-full" : "lg:h-[calc(0.34875*(100vw-80px)+80px)] 2xl:h-[587.78px]"}`}>
                <SummaryFrame
                  setActiveDisplay={setActiveDisplay}
                  halfHeight={activeDisplay !== "full"}
                />
              </div>
              {!fullscreen && !(activeDisplay == "full") && (
                <div className="grow min-h-[450px]">
                  <ChatFrame
                    onMinimizedChange={handleChatMinimized}
                    minimized={chatMinimized}
                    setFullscreen={setFullscreen}
                    messages={messages}
                    setMessages={setMessages}
                    fullscreen={fullscreen}
                  />
                </div>
              )}
            </div>
          </main>
        )}
      </div>

      {fullscreen && (
        <FullChat
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          onMinimizedChange={handleChatMinimized}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}
