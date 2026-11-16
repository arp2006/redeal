import React from "react";
import { useNavigate } from "react-router-dom";

function Item({ id, imgLink, product, price, location }) {  
  const navigate = useNavigate();
  return (
    <article className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" onClick={()=>navigate(`/product/${id}`)}>
      <div
        className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover"
        aria-label={`Image of ${product}`}
        style={{ backgroundImage: imgLink ? `url(${imgLink})` : undefined }}
      ></div>
      <div className="space-y-1 p-4">
        <p className="truncate text-base font-semibold text-[#0d171b]">{product}</p>
        <p className="text-base font-bold text-[#0d171b]">{price}</p>
        <p className="truncate text-sm text-[#4c809a]">{location}</p>
      </div>
    </article>
  );
}

export default Item;

