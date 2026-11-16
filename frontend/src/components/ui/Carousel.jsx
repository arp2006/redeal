import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({ images = [] }) {
  const [curr, setCurr] = useState(0);
  const hasImages = images.length > 0;

  const prev = () =>
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  if (!hasImages) {
    return <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500">No images available</div>;
  }

  return (
    <div className="relative aspect-[4/3] max-h-[560px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className="h-full w-full shrink-0 object-contain"
          />
        ))}
      </div>

      {images.length > 1 && <div className="absolute inset-0 flex items-center justify-between p-3">
        <button
          onClick={prev}
          aria-label="Previous image"
          className="rounded-full bg-[#3498DB] p-2 text-white shadow hover:bg-[#0a6bab] transition-colors"
        >
          <ChevronLeft size={40} className="text-white"/>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="rounded-full bg-[#3498DB] p-2 text-white shadow hover:bg-[#0a6bab] transition-colors"
        >
          <ChevronRight size={40} className="text-white"/>
        </button>
      </div>}

      {images.length > 1 && <div className="absolute bottom-4 right-0 left-0">
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
      </div>}
    </div>
  );
}
