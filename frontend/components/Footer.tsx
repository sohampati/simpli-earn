export default function Footer() {
    return (
      <footer className="w-full bg-[#0B0B0B] text-gray-400 py-6 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} SimpliEarn. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="/about" className="hover:text-white">About Us</a>
            <a href="/faq" className="hover:text-white">FAQ's</a>
            <a href="/contact" className="hover:text-white">Contact Us</a>
            <a
              href="mailto:simpliearnbdbi@gmail.com"
              className="hover:text-white"
              aria-label="Email us"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.922l-7.44 4.65a2.25 2.25 0 01-2.38 0l-7.44-4.65A2.25 2.25 0 012.25 6.993V6.75"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  }
  