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
    catch {
      console.error(error);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (loading) return;
    getInfo();
  }, [loading]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <a className="text-[#4c809a] text-sm font-medium leading-normal" href="/account">
          Account
        </a>
        <span className="text-[#4c809a] text-sm font-medium leading-normal">/</span>
        <span className="text-[#0d171b] text-sm font-medium leading-normal">
          {post.title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div className="mt-6 prose prose-slate w-full text-[#374151] min-w-[1200px]">
              {post.description}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 text-slate-600 hover:text-[#0d171b] text-sm font-medium">
                <span className="material-symbols-outlined text-lg">flag</span> Report Item
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar or related content on right */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-[#0d171b] tracking-light text-[36px] font-bold leading-tight"> ₹{post.price}</h2>
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

          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-[#0d171b] text-lg font-bold">Ad removed on <FormattedDateTime value={post.removed_at} /></h3>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-[#0d171b]">{post.seller_name}</p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default ArchivedPost;