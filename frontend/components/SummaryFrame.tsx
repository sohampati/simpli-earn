"use client";

import Image from "next/image";
import ChatIcon from "./ChatIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SummaryFrame({
  setActiveDisplay,
  halfHeight = false,
}: {
  setActiveDisplay: Dispatch<SetStateAction<string>>;
  halfHeight?: boolean;
}) {
  const [summary, setSummary] = useState("Loading summary...");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const parseToJSX = (htmlString: string) => {
    // Split the string using the <b> tags as a delimiter, but keep the <b> tags
    const parts = htmlString.split(/(<b>.*?<\/b>)/g);

    // Map over the parts and render each as JSX
    return (
      <div>
        {parts.map((part, index) => {
          if (part.startsWith('<b>') && part.endsWith('</b>')) {
            // Render the bold text within <b> tags
            return <b key={index}>{part.replace(/<b>|<\/b>/g, '')}</b>;
          }
          // Otherwise, render the regular text
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  useEffect(() => {
    const fetchSummary = async () => {
      const id = searchParams.get("id") || "1";
      try {
        const res = await fetch(`http://localhost:8000/summary?id=${id}`);
        const data = await res.json();
        if (data.summary) {
          setSummary(data.summary.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'));
        } else {
          setSummary("⚠️ No summary found.");
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("❌ Failed to load summary.");
      }
    };

    fetchSummary();
  }, [searchParams]);

  return (
    <div className="flex w-full h-full relative">
      {!halfHeight && (
        <>
          <div
            className="absolute -right-[1px] -bottom-[1px] flex z-40 items-end"
            style={{ shapeOutside: "inset(calc(100% - 110px) 0 0)" }}
          >
            <Image src="/inset-corner.svg" alt="" width={144} height={144} />
          </div>
          <div className="absolute bottom-0 right-0">
            <button onClick={() => setActiveDisplay("half")}>
              <ChatIcon />
            </button>
          </div>
        </>
      )}
      <div
        className={`w-full font-montserrat text-white mt-[40px] justify-center items-center bg-white/4 rounded-[30px] border border-white/25 overflow-auto max-h-[84vmax] relative`}
        style={{ scrollbarColor: "#ffffff9f #ffffff0f" }}
      >
        <h1 className="flex justify-center items-start pt-8 font-bold text-lg font-montserrat">
          Summary
        </h1>
        <div className="resize-x mb-24 flex">
          <div>
            {!halfHeight && (
              <span
                className="float-right flex mt-[100px] mb-5 items-end ml-4 opacity-0"
                style={{
                  shapeOutside: "inset(calc(100% - 144px) 0 0)",
                  height: "100%",
                }}
              >
                <Image
                  src="/inset-corner.svg"
                  alt=""
                  width={144}
                  height={144}
                />
              </span>
            )}
            <div className="pt-4 px-8 pb-8 -mb-[144px] whitespace-pre-wrap">
              {error || parseToJSX(summary)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
