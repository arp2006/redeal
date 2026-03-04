import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-solid border-t-[#e7eff3] mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/about">About Us</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/contact">Contact</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/privacypolicy">Privacy Policy</a>
            <a className="text-[#4c809a] hover:text-[#0d171b]" href="/tos">Terms of Service</a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-[#4c809a]">©ReDeal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
