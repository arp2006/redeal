import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Carousel from "../components/ui/Carousel";
import { AuthContext } from "../AuthContext";
import FormattedDateTime from "../components/utils/FormattedDateTime";
import { API } from "../config/api";

function ArchivedPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const getInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/archive/${id}`, {
        method: "GET",
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      const postData = await response.json();   
      setPost(postData);
    }
    catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (loading) return;
    getInfo();
  }, [loading]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-wrap gap-2 mb-6">
        <a className="text-[#4c809a] text-sm font-medium leading-normal" href="/account">
          Account
        </a>
        <span className="text-[#4c809a] text-sm font-medium leading-normal">/</span>
        <span className="text-[#0d171b] text-sm font-medium leading-normal">
          {post.title}
        </span>
      </div>

      {error ? <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p> : <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="md:col-span-2">

          <Carousel images={post.images || []} />

          <div className="mt-8">
            <h1 className="text-[#0d171b] tracking-light text-[32px] font-bold leading-tight">
              {post.title}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              {/* <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Used - Good Condition
              </span> */}
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span className="text-sm font-medium">
                  {post.location}
                </span>
              </div>
            </div>
            <p className="mt-6 whitespace-pre-wrap break-words text-[#374151]">
              {post.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 text-slate-600 hover:text-[#0d171b] text-sm font-medium">
                <span className="material-symbols-outlined text-lg">flag</span> Report Item
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar or related content on right */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-bold leading-tight text-[#0d171b]">₹{post.price}</h2>
            {/* <div className="mt-4 flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-12 px-4 bg-[#13a4ec] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#0b8acb] transition-colors">
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="truncate">Chat with Seller</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-12 px-4 bg-slate-200 text-slate-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 transition-colors">
                <span className="material-symbols-outlined">favorite_border</span>
                <span className="truncate">Add to Favorites</span>
              </button>
            </div> */}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-[#0d171b] text-lg font-bold">Ad removed on <FormattedDateTime value={post.removed_at} /></h3>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-[#0d171b]">{post.seller_name}</p>
            </div>
          </div>

        </div>
      </div>}
      
    </div>
  );
}

export default ArchivedPost;
