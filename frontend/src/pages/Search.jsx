import React, { useState, useEffect } from "react";
import Item from "../components/item/Item";
import { useSearchParams } from "react-router-dom";
import { API } from "../config/api";

function Search() {
  const [posts, setPosts] = useState([]);
  const [searchParams ] = useSearchParams();
  const query = searchParams.get('query');
  const location = searchParams.get('location')
  const min = searchParams.get('priceL');
  const max = searchParams.get('priceU');
  const categoriesStr = searchParams.get('categories');
  const categories = categoriesStr ? categoriesStr.split(',') : [];

  const getPosts = async () => {
    try {
      const response = await fetch(`${API}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchQuery: query, location: location, minP: min, maxP: max, categories: categories }),
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const postsData = await response.json();
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPosts(); 
  }, [query, location, min, max, categoriesStr]);

  return (
    <div className="min-w-0 flex-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {posts.length === 0 ? (
          <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No posts available for these search terms.</p>
        ) : (
          posts.map(post => (
            <Item
              key={post.id}
              id={post.id}
              imgLink={(post.images && post.images.length > 0) && post.images[0]}
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

export default Search;
