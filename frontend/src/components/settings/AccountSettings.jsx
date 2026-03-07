import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { API } from "../../config/api";

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const [name, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState("Update");
  const [original, setOriginal] = useState(null);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        return;
      }
      const response = await fetch(`${API}/api/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }
      const data = await response.json();
      setBio(data?.bio || "");
      setDisplayName(data.name);
      setUsername(data.username);
      setOriginal({
        name: data.name,
        username: data.username,
        bio: data.bio || ""
      });
    } catch (err) {
      console.log(err.message || "Network error");
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        return;
      }
      const hasChange = name !== original.name || username !== original.username || bio !== original.bio;
      if(!hasChange){
        setError("No changes to update.");
        return;
      }
    setLoading(true);
      let payload = { name, username, bio };
      const response = await fetch(`${API}/api/changedetails`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || 'Could not create listing');
      } else {
        setUpdate('Updated');
      }
    }
    catch (err) {
      setError(err.message || 'Network error');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-8 min-w-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black leading-tight tracking-tight text-[#0f172a]">
          Account Settings
        </h1>
        <p className="text-[#64748b] text-base">
          Manage your personal information and preferences.
        </p>
      </div>
      <div className="relative">
        <section className={`bg-white rounded-xl shadow-sm overflow-hidden transistion ${!user ? "blur-sm pointer-events-none select-none" : ""}`}>
          <div className="px-6 py-4 border-b border-[#cfdfe7] flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#0f172a]">
              Public Profile
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#0f172a]">
                  Display Name
                </label>
                <input
                  className="w-full rounded-lg overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                  type="text"
                  value={name}
                  placeholder=""
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#0f172a]">
                  Username
                </label>
                <div className="flex rounded-lg overflow-hidden">
                  {/* <span className="pl-4 py-2.5 text-[#64748b] text-sm">@</span> */}
                  <input
                    className="w-full rounded-lg overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-sm font-semibold text-[#0f172a]">
                  Bio
                </label>
                <textarea
                  className="w-full rounded-lg resize-none !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                  rows="3"
                  value={bio}
                  placeholder={"Write something about yourself"}
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="text-xs text-[#64748b] text-right">
                  {bio.length}/150 characters
                </p>

              </div>
              {error && <p className="text-left text-red-600">{error}</p>}
            </div>
            <div className="flex flex-rows gap-3">
              <button
                className="flex min-w-[54px] max-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3498DB] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0a6bab] transition"
                onClick={handleUpdate}
              >
                {loading ? 'Updating...' : update}
              </button>
              <button
                className="flex min-w-[54px] max-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7eff3] text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 transition"
                onClick={fetchDetails}
              >
                Reset
              </button>
            </div>
          </div>
        </section>
        {!user && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg shadow text-center">
              <p className="text-sm font-semibold text-[#0f172a]">
                Please log in to edit your profile
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AccountSettings;

{/* 
pfp
<div className="flex items-center gap-6">
  <div
    className="bg-center bg-no-repeat bg-cover rounded-full size-20 shadow-inner"
    style={{
      backgroundImage:
        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7yA6a9dnd8LO2AypLKzhFDqYL43qYuxJsZz2hrLgxfVUWxWgTEWMo_UDyOAygbfk8OjlTFNWIwtqCJG7N6xMZrX6sRxI2t4axWIxuK2PGCJNegchkF-Z-jqyOByRhIg3WGnEcj7RfZLey0Il_mul8rT4KzlMxdrLjpAkPMwEDlr5VN8U0BVGJt41T0hZHulmyTT9w-CcvpZ7P0TY9DkuIcTHLwtejIQA7nKucDLSD1Zbon4jCheHAM2Fos2haFFNrvPmPyQ9Jbk")',
    }}
  />

  <div className="flex flex-col gap-2">
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-bold text-[#0f172a]">
        Change Picture
      </button>
      <button className="px-4 py-2 border rounded-lg text-sm font-medium text-red-500">
        Delete
      </button>
    </div>
    <p className="text-xs text-[#64748b]">
      Recommended: Square JPG, PNG. Max 1MB.
    </p>
  </div>
</div> */}