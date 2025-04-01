import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { TbSend2 } from "react-icons/tb";
import mockCalls from "@/public/data/mock-calls.json";

export default function Home() {
  return (
    <div className="bg-[url(/bg.svg)] bg-cover justify-items-center pt-35 md:pt-40 pb-15 md:pb-20 px-8 md:px-12 gap-16 font-[family-name:var(--font-montserrat)]">
      <main className="text-center flex flex-col gap-8 row-start-2 items-center max-w-[1100px]">
        <div className="flex flex-col items-center w-full">
          <hr className="w-full h-1 border-none bg-gradient-to-r from-[rgba(129,209,141,0)] via-[rgba(129,209,141,0.15)] to-[rgba(129,209,141,0)]" />
          <div className="text-green -mt-4.5 px-4 py-1 rounded-full bg-[#131B15] shadow-[0px_0px_6.414px_0px_rgba(129,209,141,0.56)]">
            Investing. Made simple.
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl/20 font-medium mt-4">
          Turning Earnings Calls Into{" "}
          <span className="font-semibold bg-linear-to-r from-green to-[#426B48] bg-clip-text text-transparent">
            Actionable Insights
          </span>
        </h1>
        <h4 className="text-lg sm:text-xl mb-4">
          Our AI-powered platform <u>simplifies earnings calls</u>, providing
          easy-to-understand summaries, sentiment analysis, and actionable
          insights, helping you make informed financial decisions.
        </h4>
        <div className="w-full text-left justify-items-center rounded-md p-7 bg-[rgba(0, 0, 0, 0.15)] shadow-[0px_0px_7.258px_0px_rgba(129,209,141,0.50)]">
          <h4 className="font-semibold text-lg mb-3 w-full">
            Upload an <span className="text-green">earnings call</span> to get
            started:
          </h4>
          <div className="w-full rounded-full bg-[rgba(234, 250, 236, 0.14)] flex items-center">
            <FaSearch className="ml-3 text-[#808280]" />
            <input
              className="-ml-7 py-2 px-10 bg-[rgba(234,250,236,0.14)] rounded-full inset-shadow-sm inset-shadow-[rgba(0,0,0,0.25)] w-full"
              placeholder="Paste call link here...."
            />
            <Link className="-ml-11" href="/dashboard">
              <div className="transition-all bg-green rounded-full px-2 py-1 hover:brightness-80">
                <TbSend2 size={20} className="text-[#2D322E]" />
              </div>
            </Link>
          </div>
          <Link href="#earnings-calls">
            <p className="text-sm sm:text-base transition-all flex items-center gap-2 sm:gap-4 mt-4 opacity-75 hover:opacity-60">
              or choose from our library below <FaChevronDown />
            </p>
          </Link>
        </div>
        <hr
          id="earnings-calls"
          className="w-full my-7 h-1 border-none bg-[linear-gradient(90deg,_rgba(129,209,141,0)_0%,_rgba(129,209,141,0.15)_50%,_rgba(129,209,141,0)_100%)]"
        />
        <div className="grid lg:grid-cols-[1fr_500px_1fr] items-center gap-4">
          <div>
            <Image
              src="left_squares.svg"
              alt=""
              width={260}
              height={150}
              className="hidden lg:block"
            />
          </div>
          <div>
            <h3 className="text-4xl font-bold bg-linear-to-r from-green to-[#426B48] bg-clip-text text-transparent">
              Earnings Call Library
            </h3>
            <h5 className="text-xl mt-3">Try a call from our demo library.</h5>
          </div>
          <div>
            <Image
              src="right_squares.svg"
              alt=""
              width={260}
              height={150}
              className="hidden lg:block"
            />
          </div>
        </div>
        <div className="rounded-lg px-6 pt-6 pb-4 border border-[rgba(129,209,141,0.26)] bg-[rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(129,209,141,0.25)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1000px]">
            {mockCalls.map((call) => {
              const formattedDate = new Date(call.date).toLocaleDateString(
                "en-US"
              );
              return (
                <Link key={call.id} href={`/dashboard/?id=${call.id}`}>
                  <div className="transition-all rounded-lg text-left p-3 border border-[rgba(228,243,230,0.25)] bg-[rgba(249,250,249,0.04)] shadow-[0px_0px_4px_0px_rgba(129,209,141,0.50)] hover:-translate-y-1">
                    <Image
                      src={call.image}
                      alt={`${call.company} Thumbnail`}
                      width={350}
                      height={150}
                      className="rounded-md w-auto"
                    />
                    <h4 className="text-lg font-bold mt-3">
                      {call.symbol} (Q{call.quarter}{" "}
                      {new Date(call.date).getFullYear()})
                    </h4>
                    <p className="text-sm text-gray-400">{formattedDate}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="w-full opacity-60 mt-4">
            <em>Click a video card above.</em>
          </p>
        </div>
      </main>
    </div>
  );
}
