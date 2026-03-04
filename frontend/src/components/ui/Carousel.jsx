import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({ images = [] }) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative rounded-lg h-[60vh]">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className="object-contain w-full h-[60vh] flex-shrink-0"
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-[#13a4ec] text-black-800 hover:bg-[#0a6bab] transition-colors"
        >
          <ChevronLeft size={40} className="text-white"/>
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-[#13a4ec] text-black-800 hover:bg-[#0b8acb] transition-colors"
        >
          <ChevronRight size={40} className="text-white"/>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurr(index)}
              className={`
                transition-all w-3 h-3 rounded-full
                ${curr === index ? "bg-white p-1.5" : "bg-white/50"}
              `}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
