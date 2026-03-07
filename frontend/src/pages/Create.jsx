import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

function Create() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    desc: '',
    price: '',
    location: '',
    category: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files].slice(0, 5);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews, navigate]);

  const uploadImages = async () => {
    if (images.length === 0) return [];

    const token = localStorage.getItem("token");

    const formData = new FormData();
    images.forEach(img => formData.append("images", img));

    const res = await fetch(`${API}/api/upload-images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const imageUrls = await uploadImages();
      const payload = { ...form, imageUrls };
      // console.log(payload);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Could not create listing');
      } else {
        navigate('/success');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <main className="p-4 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-wrap justify-between gap-3 mb-8">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#0d171b] text-4xl font-black leading-tight tracking-[-0.033em]">
                  Create Your Sales Post
                </p>
                <p className="text-[#4c809a] text-base font-normal leading-normal">
                  Fill in the details to list your item for sale.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                    Product Title
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., Vintage Leather Jacket"
                    value={form.title}
                    onChange={handleChange}
                    name="title"
                  />
                </label>

                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                    Description
                  </p>
                  <textarea
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] min-h-36 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                    placeholder="Describe the item's condition, features, and any flaws..."
                    value={form.desc}
                    onChange={handleChange}
                    name="desc"
                  />
                </label>
              </div>

              <div className="flex flex-col space-y-6">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                    Upload Images
                  </p>
                  <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#cfdfe7] rounded-lg bg-slate-100/50 hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-4xl text-[#4c809a]">
                      upload_file
                    </span>
                    <p className="mt-2 text-sm text-[#4c809a]">
                      Drag & drop all files here at once or {" "}
                      <span className="font-semibold text-[#0d171b] cursor-pointer">
                        browse
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[#4c809a]">
                      Add up to 5 photos for best results.
                    </p>
                    <input
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {imagePreviews.map((src, i) => (
                      <div className="relative group" key={i}>
                        <img
                          className="w-full h-24 object-cover rounded-lg"
                          alt={`Preview ${i + 1}`}
                          src={src}
                        />
                      </div>
                    ))}
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#e7eff3]">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                  Price
                </p>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4c809a]">₹</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 placeholder:text-[#4c809a] pl-8 p-[15px] text-base font-normal leading-normal"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    name="price"
                  />
                </div>
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                  Category
                </p>
                <div className="relative">
                  <select
                    className="form-select appearance-none flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 p-[15px] text-base font-normal leading-normal pr-10"
                    value={form.category}
                    onChange={handleCategoryChange}
                    name="category"
                  >
                    <option disabled value="">Select a category</option>
                    <option>Electronics</option>
                    <option>books</option>
                    <option>Games</option>
                    <option>Furniture</option>
                    <option>Toys</option>
                    <option>Apparel</option>
                    <option>Musical instruments</option>
                    <option>Shoes</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#4c809a]">
                    expand_more
                  </span>
                </div>
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d171b] text-base font-medium leading-normal pb-2">
                  Location
                </p>
                <div className="relative">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal pr-10"
                    placeholder="e.g., Mumbai"
                    value={form.location}
                    name="location"
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#4c809a]">
                    location_on
                  </span>
                </div>
              </label>
            </div>

            {error && <div className="text-red-600 font-semibold">{error}</div>}

            <div className="flex justify-end gap-4 mt-12 pt-6 border-t border-[#e7eff3]">
              <button
                type="button"
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-black gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-[#e7eff3]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#3498DB] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-[#0a6bab] transition"
              >
                {loading ? "Posting..." : "Post Listing"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Create;
