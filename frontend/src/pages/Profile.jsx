import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../components/item/Item";
import { AuthContext } from "../AuthContext";
import { API } from "../config/api";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const getInfo = async () => {
    const res = await fetch(`${API}/api/users/${id}`);
    if (!res.ok) throw new Error("Profile fetch failed");
    return res.json();
  };

  const getPosts = async () => {
    const res = await fetch(`${API}/api/users/${id}/listings`);
    if (!res.ok) throw new Error("Posts fetch failed");
    return res.json();
  };

  const load = async () => {
    try {
      const [profileData, postsData] = await Promise.all([
        getInfo(),
        getPosts(),
      ]);
      setProfile(profileData);
      setPosts(postsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id])

  if (loading) {
    return <p className="text-center mt-10">Loading…</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10">User not found</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-40 py-8">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-2xl md:text-3xl font-bold">
                {profile.name}
              </h1>
              <p className="text-slate-500">@{profile.username}</p>
              <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-sm">
                  calendar_month
                </span>
                <span>Joined Oct 2022</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/* <button className="min-w-[140px] h-11 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary/90">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Create Listing
              </span>
            </button> */}
            { user?.id === Number(id) &&
            <button 
              className="min-w-[140px] h-11 px-6 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold cursor-pointer hover:bg-slate-50"
              onClick={() => navigate('/settings/account')}
            >
              Manage Account
            </button>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          [posts.length, "inventory_2", "Active Listings"],
          // ["4.9", "reviews", "User Rating"],
          // ["128", "shopping_cart_checkout", "Items Sold"],
          // ["12", "group", "Followers"],
        ].map(([value, icon, label]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-slate-900 text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-sm text-primary">
                {icon}
              </span>
              <p className="text-sm font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Listings grid placeholder */}
      <p className="text-2xl font-extrabold text-[#3498DB] uppercase tracking-wide mb-4 pl-4 ">
        Active Posts
      </p>
      <div className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-4">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map(post => (
              <Item
                key={post.id}
                id={post.id}
                imgLink={post.images && post.images.length > 0 && post.images[0]}
                product={post.title}
                price={`₹${post.price}`}
                location={post.location}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
