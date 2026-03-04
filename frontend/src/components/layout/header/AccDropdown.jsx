import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function AccDropdown({ u }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  if(!u) {
    return (<p>dropdown</p>);
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-sm pe-1 font-medium text-heading rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        {/* <img
          className="w-8 h-8 me-2 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt="user"
        /> */}
        {u.name}
        <svg
          className="w-4 h-4 ms-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 z-10 bg-white shadow-lg rounded-md rounded-base shadow-lg w-50">
          <div className="p-3 cursor-default pb-0">
            <div className="flex items-center p-2 bg-neutral-secondary-strong rounded">
              {/* <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-5.jpg"
                alt="avatar"
              /> */}
              <div>
                <div className="font-medium text-heading">
                  {u.name}
                </div>
              </div>
              {/* <span className="ms-auto bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs px-1.5 py-0.5 rounded">
                PRO
              </span> */}
            </div>
          </div>

          <ul className="px-3 pb-3 text-sm font-medium text-body">
            <li>
              <a
                onClick={() => navigate("/account")}
                className="flex items-center w-full p-2 rounded cursor-pointer hover:bg-gray-100"
              >
                Account
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/settings/account")}
                className="flex items-center w-full p-2 mb-1.5 rounded cursor-pointer hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
            <li className="border-t border-default-medium pt-1.5">
              <a
                onClick={handleLogout}
                className="flex items-center w-full p-2 rounded text-white bg-red-500 cursor-pointer hover:text-black"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default AccDropdown;