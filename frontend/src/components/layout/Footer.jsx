import React from "react";

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:order-2">
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/about">About Us</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/contact">Contact</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/privacypolicy">Privacy Policy</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/tos">Terms of Service</a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-[#4c809a]">© ReDeal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
