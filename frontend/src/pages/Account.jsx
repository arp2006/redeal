import React, { useState, useContext, useEffect } from "react";
import Item from "../components/item/Item";
import ArchivedItem from "../components/item/ArchivedItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { API } from "../config/api"

function Account() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [oldPosts, setOldPosts] = useState([]);
  // console.log("ACCOUNT PAGE:", { user, loading });

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    if(!token) return;
    try {
      const response = await fetch(`${API}/api/account-listings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const postsData = await response.json();
      setPosts(postsData);

      const response2 = await fetch(`${API}/api/archive`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      if (!response2.ok) throw new Error('Failed to fetch posts');
      const archive = await response2.json();
      setOldPosts(archive);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getPosts();
  }, []);


  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-10">
      <section>
      <p className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-[#3498DB]">
        Active Posts
      </p>
      <div className="pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posts.length === 0 ? (
            <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No active posts yet.</p>
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
      </section>
      <section>
      <p className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-[#3498DB]">
        Archive
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {oldPosts.length === 0 ? (
            <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No archived posts yet.</p>
          ) : (
            oldPosts.map(post => (
              <ArchivedItem
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
      </section>
    </div>
  );
}

export default Account;
