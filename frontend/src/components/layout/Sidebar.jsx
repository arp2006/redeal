import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Sidebar() {
  // const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    categories: [],
    priceL: '',
    priceU: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prev) => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, id] }
      }
      else {
        return { ...prev, categories: prev.categories.filter((cat) => cat !== id) };
      }
    });
  };

  const loag = () => {
    console.log(filters);
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      categories: [],
      priceL: '',
      priceU: '',
    });
  };

  const applyFilters = () => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.categories.length > 0) params.categories = filters.categories.join(',');
    if (filters.priceL) params.priceL = filters.priceL;
    if (filters.priceU) params.priceU = filters.priceU;
    if (query) params.query = query;
    setSearchParams(params);
  }

  const categories = [
    { id: "1", label: "Electronics" },
    { id: "2", label: "Books" },
    { id: "3", label: "Games" },
    { id: "4", label: "Furniture" },
    { id: "5", label: "Toys" },
    { id: "6", label: "Apparel" },
    { id: "7", label: "Musical Instruments" },
    { id: "8", label: "Shoes" },
  ];

  return (
    <aside className="w-1/4 pr-8">
      <div className="bg-white p-5 rounded-xl shadow border border-slate-100">
        <h3 className="text-lg font-bold text-[#0d171b] mb-4">Filters</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0d171b]" htmlFor="location">
              Location
            </label>
            <select
              className="mt-1 block w-full h-10 px-3 text-sm border border-slate-300 rounded-md 
              focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-[#3498DB]
              bg-white"
              id="location"
              name="location"
              onChange={handleLocationChange}
              value={filters.location}
            >
              <option disabled value="">Select Location</option>
              <option>Mumbai</option>
              <option>Bengaluru</option>
              <option>Hyderabad</option>
              <option>Chapra</option>
            </select>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#0d171b]">Category</h4>
            <div className="mt-2 space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 px-2 py-1 rounded-md
                   hover:bg-slate-50 transition"
                >
                  <input
                    id={cat.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300
                     text-[#3498DB] focus:ring-[#3498DB]"
                    checked={filters.categories.includes(cat.id)}
                    onChange={handleCategoryChange}
                  />

                  <label
                    htmlFor={cat.id}
                    className="text-sm text-[#4c809a] cursor-pointer select-none"
                  >
                    {cat.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[#0d171b]">Price Range</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                className="h-10 px-3 border border-slate-300 rounded-md text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min"
              />
              <input
                className="h-10 px-3 border border-slate-300 rounded-md text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max"
              />
            </div>

          </div>
          <div className="flex space-x-2">
            <button
              className="flex-1 h-9 rounded-md bg-[#3498DB] cursor-pointer text-white text-sm font-medium hover:bg-[#0a6bab] transition"
              onClick={applyFilters}
            >
              <span className="truncate">Apply</span>
            </button>
            <button
              className="flex-1 h-9 rounded-md bg-slate-100 text-slate-700 cursor-pointer text-sm font-medium hover:bg-slate-200 transition"
              onClick={clearFilters}
            >
              <span className="truncate">Clear</span>
            </button>
          </div>
        </div>
      </div>
      {/* <button
        className="flex-1 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7eff3] text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em]"
        onClick={loag}
      >
        <span className="truncate">test</span>
      </button> */}
    </aside>
  );
}

export default Sidebar;