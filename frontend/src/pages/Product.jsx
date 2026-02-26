import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Carousel from "../components/Carousel";
import { AuthContext } from "../AuthContext";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const getInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}?summary=false`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      const postData = await response.json();
      setPost(postData);
    }
    catch {
      console.error(error);
    }
  }

  const handleStartChat = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.id === post.seller_id) {
      alert("You cannot chat with yourself.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/conversations/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: post.id }),
      });

      if (!res.ok) throw new Error("Failed to start conversation");

      const conversation = await res.json();

      navigate("/chat", {
        state: {
          convId: conversation.id,
          sellerName: post.seller_name,
          itemId: post.id,
        },
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    getInfo();
  }, [loading]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <a className="text-[#4c809a] text-sm font-medium leading-normal" href="/">
          Home
        </a>
        <span className="text-[#4c809a] text-sm font-medium leading-normal">/</span>
        <span className="text-[#0d171b] text-sm font-medium leading-normal">
          {post.title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">

          <Carousel images={post.images} />

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
            <h2 className="text-[#0d171b] tracking-light text-[36px] font-bold leading-tight"> ₹{[post.price]}</h2>
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={handleStartChat} 
                className="w-full flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-12 px-4 bg-[#13a4ec] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#0b8acb] transition-colors"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="truncate">Chat with Seller</span>
              </button>
              {/* <button className="w-full flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-12 px-4 bg-slate-200 text-slate-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 transition-colors">
                <span className="material-symbols-outlined">favorite_border</span>
                <span className="truncate">Add to Favorites</span>
              </button> */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-[#0d171b] text-lg font-bold">Seller Information</h3>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-[#0d171b]">{post.seller_name}</p>
              {!user || post.seller_id !== user.id ? <></> : (
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="px-4 py-2  bg-[#13a4ec] cursor-pointer text-white rounded-md text-sm hover:bg-[#0b8acb]"
                >
                  Edit Post
                </button>)}
            </div>
            <Link to={`/profile/${post.seller_id}`} className="mt-4 inline-block text-[#13a4ec] hover:underline text-sm font-medium">View Seller's Other Items</Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Product;