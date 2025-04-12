"use client";

import { useState } from "react";
import SentimentGraph from "./SentimentGraph";
import StockChart from "./StockChart";
import { useSearchParams } from "next/navigation";

// Dashboard configurations
const dashboardConfigs: Record<string, { ticker: string; date: string }> = {
  "1": { ticker: "AAPL", date: "2/2/25" },
  "2": { ticker: "CVS", date: "11/6/24" },
  "3": { ticker: "GOOGL", date: "2/4/25" },
  "4": { ticker: "SHEL", date: "1/30/25" },
  "5": { ticker: "TSLA", date: "1/29/25" },
  "6": { ticker: "WMT", date: "2/20/25" }
};

interface ChartsFrameSentimentGraphProps {
  sentimentData: Record<string, number>; // Dictionary of timestamp (x-axis) and sentiment value (y-axis)
  onTimestampClick: (timestamp: number) => void; // Callback to update video timestamp
}

export default function ChartsFrame({ sentimentData, onTimestampClick }: ChartsFrameSentimentGraphProps) {
  const [activeTab, setActiveTab] = useState("stock");
  const searchParams = useSearchParams();
  const dashboardId = searchParams.get("id");
  const config = dashboardId ? dashboardConfigs[dashboardId] : null;

  return (
    <div className="flex flex-col text-white w-full h-full max-h-120">
      <div className="bg-white/4 text-white rounded-[30px] w-full h-full border border-white/25">
        {activeTab === "stock" ? (
          <div className="flex flex-col w-full h-full relative">
            <div className="flex flex-row relative">
              {/* Stock Button */}
              <button
                className="flex justify-start items-start rounded-tl-[30px] rounded-tr-[23px] w-1/2 h-[40px] border-t-[1px] border-white/25 cursor-pointer relative"
                onClick={() => setActiveTab("stock")}
              >
                <h1 className="flex justify-center items-center font-bold text-sm font-montserrat w-full h-full">
                  48-Hour Stock Movement
                </h1>
              </button>

              {/* Sentiment Button */}
              <button
                className="flex justify-end items-end rounded-bl-[23px] rounded-tr-[30px] w-1/2 h-[40px] border-b-[1px] border-white/25 cursor-pointer relative"
                onClick={() => setActiveTab("sentiment")}
              >
                <h1 className="flex justify-center items-center font-bold text-sm font-montserrat w-full h-full text-white opacity-50">
                  Time-Series Sentiment
                </h1>
              </button>

              {/* Pseudo-Element Overlay to Seamlessly Blend the Borders */}
              <div className="absolute top-1/2 left-1/2 w-[0.5px] h-[18px] bg-white/12 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transform -rotate-20"></div>
            </div>

            <div className="flex justify-center items-center w-full h-full">
              {config ? (
                <StockChart ticker={config.ticker} date={config.date} />
              ) : (
                <div className="text-center text-white/70">
                  <p className="text-lg font-medium">Unable to display stock chart</p>
                  <p className="text-sm mt-2">Please select a valid dashboard</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full relative">
            <div className="flex flex-row relative">
              {/* Stock Button */}
              <button
                className="flex justify-start items-start rounded-tl-[30px] rounded-br-[23px] w-1/2 h-[40px] border-b-[1px] border-white/25 cursor-pointer relative"
                onClick={() => setActiveTab("stock")}
              >
                <h1 className="flex justify-center items-center font-bold text-sm font-montserrat w-full h-full opacity-50">
                  48-Hour Stock Movement
                </h1>
              </button>

              {/* Sentiment Button */}
              <button
                className="flex justify-end items-end rounded-tl-[23px] rounded-tr-[30px] w-1/2 h-[40px] border-t-[1px] border-white/25 cursor-pointer relative"
                onClick={() => setActiveTab("sentiment")}
              >
                <h1 className="flex justify-center items-center font-bold text-sm font-montserrat w-full h-full">
                  Time-Series Sentiment
                </h1>
              </button>

              {/* Pseudo-Element Overlay to Seamlessly Blend the Borders */}
              <div className="absolute top-1/2 left-1/2 w-[0.5px] h-[18px] bg-white/12 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transform rotate-20"></div>
            </div>

            <div className="flex justify-center items-center w-full h-full">
              <SentimentGraph sentimentData={sentimentData} onTimestampClick={onTimestampClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}