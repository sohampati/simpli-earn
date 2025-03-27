"use client";

import { useState } from "react";

export default function ChartsFrame() {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="flex flex-col text-white w-full h-full mt-10">
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
                  24-Hour Stock Movement
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
              Stock Chart
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
                  24-Hour Stock Movement
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
              Sentiment Graph
            </div>
          </div>
        )}
      </div>
    </div>
  );
}