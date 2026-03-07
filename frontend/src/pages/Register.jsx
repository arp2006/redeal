import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { API } from "../config/api";

function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    region: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.repeatPassword) {
      setError("Passwords must match");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Registration failed');
      }
      else {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate("/");
      }
    } catch (err) {
      setError('Failed to register: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user)
      navigate("/", { replace: true });
  }, [user, navigate]);

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-col items-center mt-1">
              <div className="w-full max-w-md">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <p className="text-[#0d171b] text-4xl font-black leading-tight tracking-[-0.033em] w-full text-center">
                    Create an Account
                  </p>
                </div>
                <div className="pb-3 flex justify-center">
                  <p className="text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em]">Register</p>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                        Name
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Full Name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                        Username
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                      <div className="flex justify-between items-center pb-2">
                        <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                          Email
                        </p>
                        <span className="text-sm text-red-500">Unchangable</span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                        Password
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                        Repeat Password
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Repeat Password"
                        type="password"
                        name="repeatPassword"
                        value={form.repeatPassword}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                      <div className="flex justify-between items-center pb-2">
                        <p className="text-[#0d171b] text-base font-medium leading-normal">
                          Region
                        </p>
                        <span className="text-sm text-gray-500">Optional</span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Your Region"
                        type="text"
                        name="region"
                        value={form.region}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                  <button
                    className="w-full bg-[#13a4ec] text-white font-bold py-3 px-4 rounded-lg cursor-pointer hover:bg-[#0a6bab] transition"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Create Account'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
