import React from "react";
import { useNavigate } from "react-router-dom";

function Item({ id, imgLink, product, price, location }) {  
  const navigate = useNavigate();
  return (
    <div className=" cursor-pointer flex flex-col gap-3 pb-3 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" onClick={()=>navigate(`/product/${id}`)}>
      <div
        className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover"
        data-alt={`Image of ₹{product}`}
        style={{ backgroundImage: `url(${imgLink})` }}
      ></div>
      <div className="p-3">
        <p className="text-[#0d171b] text-base font-medium leading-normal">{product}</p>
        <p className="text-[#333] text-base font-bold leading-normal">{price}</p>
        <p className="text-[#4c809a] text-sm font-normal leading-normal">{location}</p>
      </div>
    </div>
  );
}

export default Item;

