export default function DashboardTab() {
  return (
    <div>
      <a
        href="/"
        className="flex bg-white/15 text-white justify-center items-center w-[389px] h-[40px] transition-transform duration-300 hover:scale-110 cursor-pointer -mt-1 font-montserrat"
        style={{
          maskImage: "url('/dashboard-tab.svg')",
          WebkitMaskImage: "url('/dashboard-tab.svg')",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskPosition: "center", // Ensures the mask is centered
          WebkitMaskPosition: "center",
        }}
      >
        Return to Library
      </a>
    </div>
  );
}