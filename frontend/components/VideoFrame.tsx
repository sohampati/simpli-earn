export default function VideoFrame() {
  return (
    <div className="flex text-white w-full relative mt-[20px] lg:mt-0">
      <div className="flex flex-row absolute w-full h-[40px]">
        <button className="relative w-[53%] h-[40px] border-t-[1px] border-l-[1px] border-white/25 rounded-tl-[30px] rounded-tr-[23px] px-8 flex items-center">
          <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-sm font-montserrat">
            Tesla - Tesla Q4 and full year 2024 Financial Results and Q&A Webcast
          </h1>
        </button>
         <div className="flex justify-end rounded-bl-[23px] w-1/10 h-[40px] border-b-[1px] border-white/25 relative">
         </div>
         {/* Pseudo-Element Overlay to Seamlessly Blend the Borders */}
        <div className="absolute top-1/2 left-9/10 w-[0.5px] h-[18px] bg-white/12 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transform -rotate-20"></div>
      </div>
      <div className="justify-center items-center bg-white/4 text-white mt-[40px] rounded-b-[30px] rounded-tr-[30px] overflow-hidden aspect-16/9 w-full border border-white/25">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Gub5qCTutZo?controls=1&modestbranding=1&showinfo=0&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}