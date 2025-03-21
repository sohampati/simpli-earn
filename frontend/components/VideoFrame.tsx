export default function VideoFrame() {
  return (
    <div className="flex text-white w-full h-full">
      <div className="absolute w-[65vh] pt-[10px] pb-3 px-10 -z-1 font-bold bg-white/15 text-white text-sm rounded-t-[30px] justify-left truncate w-[calc(full-40px)] font-montserrat border border-[0.85px] border-white/25">
        Tesla - Tesla Q4 and full year 2024 Financial Results and Q&A Webcast
      </div>
      <div className="justify-center items-center bg-white/4 text-white mt-[40px] rounded-b-[30px] rounded-tr-[30px] overflow-hidden aspect-16/9 w-full h-full border border-[0.85px] border-white/25">
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