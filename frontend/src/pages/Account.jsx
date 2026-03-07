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
    <div className="relative min-h-screen w-full">
      <p className="text-2xl font-extrabold text-[#3498DB] uppercase tracking-wide mb-4 pl-4 ">
        Active Posts
      </p>
      <div className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pl-4">
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
      <p className="text-2xl font-extrabold text-[#3498DB] uppercase tracking-wide mb-4 pl-4 pt-4">
        Archive
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pl-4">
          {oldPosts.length === 0 ? (
            <p>No posts available.</p>
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
    </div>
  );
}

export default Account;
