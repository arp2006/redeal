import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { API } from "../../config/api";

function SecuritySettings() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      setEmail(data.email)
    } catch (err) {
      console.log(err.message || "Network error");
    }
  };

  const passwordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!oldPass || !newPass || !confPass) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (newPass !== confPass) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      setLoading(true);
      const response = await fetch(
        `${API}/api/changepassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPass,
            newPass,
            confPass,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Password update failed");
      }
      else {
        setSuccess("Password updated successfully.");
        setOldPass("");
        setNewPass("");
        setConfPass("");
      }
    }
    catch (err) {
      setError(err.message || "Network error");
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
          Security
        </h1>
        <p className="text-[#64748b] text-base">
          Change e-mail and password.
        </p>
      </div>

      <div className="relative">
        <section className={`bg-white rounded-xl shadow-sm overflow-hidden transition ${!user ? "blur-sm pointer-events-none select-none" : ""}`}>
          <div className="px-6 py-4 border-b border-[#cfdfe7] flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#0f172a]">
              Account Details
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#0f172a]">
                    Update Password
                  </label>
                  <input
                    className="w-full rounded-lg overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                    type="password"
                    placeholder="Enter old password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#0f172a]">
                    Both passwords must match
                  </label>
                  <div className="flex rounded-lg overflow-hidden">
                    <input
                      className="w-full rounded-lg overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                      type="password"
                      placeholder="Enter new password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                  </div>
                  <div className="flex rounded-lg overflow-hidden">
                    <input
                      className="w-full rounded-lg overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                      type="password"
                      placeholder="Re-enter new password"
                      value={confPass}
                      onChange={(e) => setConfPass(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pb-2">
                    <label className="text-sm font-semibold text-[#0f172a]">
                      E-mail
                    </label>

                    <span className="text-sm text-gray-500">Read only</span> </div>
                  <input
                    className="w-full rounded-lg cursor-text overflow-hidden !text-[#0f172a] bg-gray-100 dark:bg-background-dark border-transparent focus:border-[#3498DB] focus:ring-0 dark:text-white px-4 py-2.5 text-sm transition-colors"
                    type="text"
                    value={email}
                    disabled
                  />

                </div>
              </div>
            </div>
            {error && <p className="text-left text-red-600">{error}</p>}
            {success && <p className="text-sm font-semibold text-[#0f172a]">{success}</p>}
            <button
              className="flex min-w-[54px] max-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3498DB] hover:bg-[#0a6bab] transition text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] "
              onClick={passwordChange}
            >
              {loading ? 'Updating...' : "Update"}
            </button>
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
export default SecuritySettings;