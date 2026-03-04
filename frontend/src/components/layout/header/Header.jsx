import React, { useContext, useEffect, useState } from "react";
import Logo from '../../../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import AccDropdown from "./AccDropdown";

function Header() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  const [userInfo, setUserInfo] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const getInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("http://localhost:3000/api/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user info");
      const data = await response.json();
      setUserInfo(data);
    }
    catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    if(user)
      getInfo();
  }, [user]);

  return (
    <header className="fixed w-full top-0 left-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eff3] px-10 py-3 bg-white">
      <div className="cursor-pointer flex items-center gap-4 text-[#0d171b]" onClick={() => navigate("/")}>
        <div className="size-4">
          <svg width="40px" height="40px" viewBox="3 9 26 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.99255 12.9841C4.44027 12.9841 3.99255 13.4318 3.99255 13.9841C3.99255 14.3415 4.18004 14.6551 4.46202 14.8319L7.14964 17.5195C7.54016 17.9101 8.17333 17.9101 8.56385 17.5195C8.95438 17.129 8.95438 16.4958 8.56385 16.1053L7.44263 14.9841H14.9926C15.5448 14.9841 15.9926 14.5364 15.9926 13.9841C15.9926 13.4318 15.5448 12.9841 14.9926 12.9841L5.042 12.9841C5.03288 12.984 5.02376 12.984 5.01464 12.9841H4.99255Z" fill="#3498db"></path> <path d="M19.0074 11.0159C19.5597 11.0159 20.0074 10.5682 20.0074 10.0159C20.0074 9.6585 19.82 9.3449 19.538 9.16807L16.8504 6.48045C16.4598 6.08993 15.8267 6.08993 15.4361 6.48045C15.0456 6.87098 15.0456 7.50414 15.4361 7.89467L16.5574 9.01589L9.00745 9.01589C8.45516 9.01589 8.00745 9.46361 8.00745 10.0159C8.00745 10.5682 8.45516 11.0159 9.00745 11.0159L18.958 11.0159C18.9671 11.016 18.9762 11.016 18.9854 11.0159H19.0074Z" fill="#3498db"></path> </g></svg>
        </div>
        <h2 className="text-[#0d171b] text-lg font-bold leading-tight tracking-[-0.015em]">
          ReDeal
        </h2>
      </div>
      <div className="flex flex-1 items-center justify-center px-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col min-w-40 h-10 w-full max-w-[480px]">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#4c809a] flex border border-[#cfdfe7] bg-slate-50 items-center justify-center pl-3 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined text-base">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-full placeholder:text-[#4c809a] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
              placeholder="Search for items, brands, or categories..."
              name="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
            <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-[#cfdfe7] bg-slate-50 pr-1">
              <button 
                className="flex min-w-[70px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-8 px-3 bg-[#3498DB] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0a6bab] transition"
                type="submit" >
                <span className="truncate">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        {loading ? null : user ? (
          <>
            <Link to="/create" className="text-[#0d171b] text-sm font-medium leading-normal">Sell an Item</Link>
            <Link to="/chat" className="text-[#0d171b] text-sm font-medium leading-normal">Chat</Link>
            <AccDropdown u={userInfo} />
          </>
        ) : (
          <div className="flex gap-2">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3498DB] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0a6bab] transition"
              onClick={() => navigate("/login")}
            >
              <span className="truncate">Login</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7eff3] text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 transition"
              onClick={() => navigate("/register")}
            >
              <span className="truncate">Register</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;