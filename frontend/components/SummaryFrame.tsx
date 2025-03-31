import Image from "next/image";
import ChatIcon from "./ChatIcon";
import { Dispatch, SetStateAction } from "react";

export default function SummaryFrame({ setActiveDisplay, halfHeight = false }: { setActiveDisplay: Dispatch<SetStateAction<string>>, halfHeight?: boolean }) {
  return (
    <div className="mt-[40px] flex w-full h-full relative">
      {/* Keep only if not halfHeight */}
      {!halfHeight && (
        <>
          <div
            className="absolute -right-[1px] -bottom-[1px] flex z-40 items-end"
            style={{
              shapeOutside: "inset(calc(100% - 110px) 0 0)",
            }}
          >
            <Image src="/inset-corner.svg" alt="" width={144} height={144} />
          </div>
          <div className="absolute bottom-0 right-0">
            <button
              onClick={() => setActiveDisplay("half")}
            >
              <ChatIcon />
            </button>
          </div>
        </>
      )}
      <div
        className={`w-full font-montserrat text-white mt-[40px] justify-center items-center bg-white/4 rounded-[30px] border border-white/25 overflow-auto max-h-[160vh] relative`}
        style={{ scrollbarColor: '#ffffff9f #ffffff0f' }}
      >

        <h1 className="flex justify-center items-start pt-8 font-bold text-lg font-montserrat">Summary</h1>
        <div
          className="resize-x mb-24 flex"
        >
          <div>
            {!halfHeight && <span
              className="float-right flex mt-[100px] items-end ml-4 opacity-0"
              style={{
                shapeOutside: "inset(calc(100% - 144px) 0 0)",
                height: "100%",
              }}
            >
              <Image src="/inset-corner.svg" alt="" width={144} height={144} />
            </span>}
            <p className="pt-4 px-8 pb-8 -mb-[144px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in dui
              quis orci ultricies aliquet nec sed enim. Mauris id rutrum nulla, et
              ornare leo. Donec aliquet malesuada tellus, eu laoreet lectus tincidunt
              ut. Quisque lacus magna, interdum eu urna ac, aliquet gravida orci.
              Pellentesque gravida urna sit amet nulla suscipit, at venenatis lorem
              dignissim. Morbi quis nunc eu velit condimentum ornare. Curabitur
              finibus tincidunt ullamcorper. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Fusce vitae elit eget velit porttitor
              consequat nec sed turpis. Proin libero nisl, egestas hendrerit vulputate
              et, lobortis non nulla. Aenean dui libero, dictum vel nibh eget,
              tristique egestas enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in dui
              quis orci ultricies aliquet nec sed enim. Mauris id rutrum nulla, et
              ornare leo. Donec aliquet malesuada tellus, eu laoreet lectus tincidunt
              ut. Quisque lacus magna, interdum eu urna ac, aliquet gravida orci.
              Pellentesque gravida urna sit amet nulla suscipit, at venenatis lorem
              dignissim. Morbi quis nunc eu velit condimentum ornare. Curabitur
              finibus tincidunt ullamcorper. Pellentesque tincidunt et odio vitae
              tempus. Praesent ac erat ut eros venenatis pulvinar. Pellentesque eu
              dapibus dui. Ut semper sed enim ut vestibulum. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Fusce vitae elit eget velit porttitor
              consequat nec sed turpis. Proin libero nisl, egestas hendrerit vulputate
              et, lobortis non nulla. Aenean dui libero, dictum vel nibh eget,
              tristique egestas enim.</p>
          </div>
        </div>
      </div>



    </div>
  );
}