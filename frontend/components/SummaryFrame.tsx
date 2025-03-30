export default function SummaryFrame({ halfHeight = false }: { halfHeight?: boolean }) {
  return (
    <div className="flex w-full h-full">
      <div
        className={`w-full h-full font-montserrat text-white mt-[40px] justify-center items-center bg-white/4 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-[30px] border-t-[1px] border-l-[1px] border-white/25 relative overflow-scroll ${
          halfHeight ? 'border-b-[1px] border-r-[1px] rounded-br-[30px]' : ''
        }`}
      >
        {/* Keep only if not halfHeight */}
        {!halfHeight && (
          <>
            <div className="bottom_section absolute h-[31px] w-[calc(100%-99px)] bg-transparent bottom-0 left-0 rounded-b-[30px] border-b-[1px] border-r-[1px] border-white/25"></div>
            <div className="right_section absolute z-10 h-[calc(100%-99px)] w-[29px] bg-transparent top-0 right-0 rounded-tr-[30px] rounded-br-[30px] border-r-[1px] border-b-[1px] border-white/25"></div>
            <div className="inset_area absolute z-1 h-[71px] w-[71px] bg-black/50 bottom-[29px] right-[29px] rounded-tl-[60px] border-t-[1px] border-l-[1px] border-white/25">
              <div className="bottom_left_corner absolute w-[30px] aspect-square bg-[radial-gradient(circle_30px_at_top_left,_transparent_100%,rgba(0,0,0,0.5))] bottom-[-29px] left-[-30px]"></div>
              <div className="top_right_corner absolute w-[30px] aspect-square bg-[radial-gradient(circle_30px_at_top_left,_transparent_100%,rgba(0,0,0,0.5))] right-[-29px] top-[-30px]"></div>
            </div>
            <div className="inset_area_bot absolute z-1 h-[99px] w-[29px] bg-black/50 bottom-0 right-0"></div>
            <div className="inset_area_right absolute z-1 h-[29px] w-[70px] bg-black/50 bottom-0 right-[29px]"></div>
          </>
        )}

        <h1 className="flex justify-center items-start pt-8 font-bold text-lg font-montserrat">Summary</h1>
        <div className="flex flex-col justify-start items-start text-md px-10 py-8">
          <p>
            Consequat minim nisi ea irure et quis eu elit proident mollit et ex. Ad eu ea ea. Mollit nostrud laborum commodo aute non occaecat cupidatat ea.
            Proident ut cillum culpa ea aute et. Laborum commodo elit in magna. Cupidatat cupidatat deserunt cillum. Id dolor excepteur sit ipsum. Aliqua
            voluptate pariatur fugiat quis minim ea id cillum occaecat consectetur qui exercitation veniam. Ut ea cillum fugiat sunt cillum mollit dolore
            adipisicing ipsum consequat ut laborum mollit consequat eiusmod. Aliquip elit non ea esse. Dolor velit pariatur incididunt quis consequat non.
            Labore dolore dolor in quis minim ea in qui culpa adipisicing. Ut fugiat quis ut nulla mollit sit occaecat sit esse et ad tempor minim culpa aliquip.
            Et aute deserunt incididunt est nostrud aute esse id dolor deserunt veniam est sint qui. Laboris cillum exercitation veniam incididunt duis. Laboris
            consequat dolor minim officia nostrud Lorem occaecat nisi consectetur consectetur ullamco irure aute voluptate officia. Amet ipsum minim fugiat esse
            pariatur exercitation occaecat. Laborum veniam aliquip pariatur cupidatat aliquip sit in. Nulla laboris deserunt non magna consequat qui do ut qui
            enim sunt qui laboris mollit. Enim ipsum velit cupidatat irure ipsum dolore cillum anim et ad laboris dolore sunt. Do et consectetur laboris aliqua
            ut nisi nostrud elit. Laboris esse do mollit ullamco dolor. Excepteur veniam non labore minim veniam incididunt consectetur. Fugiat commodo in
            voluptate sunt est officia voluptate Lorem commodo deserunt ut fugiat. Sit proident velit laborum. Aliquip duis duis anim. Dolor laboris adipisicing
            quis anim. In esse nisi anim Lorem ut sunt consequat amet amet duis ipsum nostrud dolore. Duis exercitation labore non ea enim occaecat et incididunt
            sit Lorem dolore ea. Incididunt incididunt officia deserunt est in adipisicing et mollit velit.
          </p>
        </div>
      </div>
    </div>
  );
}