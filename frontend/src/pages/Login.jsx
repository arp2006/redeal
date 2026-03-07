import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { API } from "../config/api";

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const id = user?.id;
  // console.log(user);
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
      } 
      else {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/');
      }
    } catch (err) {
      setError('Failed to login: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(()=>{
    if(user)
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
            <div className="flex flex-col items-center mt-10">
              <div className="w-full max-w-md">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <p className="text-[#0d171b] text-4xl font-black leading-tight tracking-[-0.033em] w-full text-center">
                    Welcome Back
                  </p>
                </div>
                <div className="pb-3 flex justify-center">
                  <p className="text-[#0d171b] text-sm font-bold leading-normal tracking-[0.015em]">Sign In</p>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                        Username / Email
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#cfdfe7] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                        placeholder="Username / Email Address"
                        type="text"
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
                  </div>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#13a4ec] text-white font-bold py-3 px-4 rounded-lg cursor-pointer hover:bg-[#0a6bab] transition"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
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

export default Login;
