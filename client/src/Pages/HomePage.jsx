// client/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../api'; // Your API service
import useApi from '../hooks/useApi'; // We'll create this custom hook

function HomePage() {
  const { data: posts, loading, error, request: fetchPosts } = useApi(postService.getAllPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <div className="text-center text-lg">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">Error: {error.message}</div>;

  // Safely extract posts array from response
  const postArray = Array.isArray(posts?.posts) ? posts.posts : [];
  if (postArray.length === 0) return <div className="text-center text-lg">No posts found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1 className="col-span-full text-3xl font-bold mb-6 text-center">Latest Blog Posts</h1>
      {postArray.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.featuredImage && (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${post.featuredImage}`}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/posts/${post.slug}`} className="hover:text-blue-600">{post.title}</Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              By {post.author?.username || 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{post.excerpt || post.content.substring(0, 150)}...</p>
            <Link to={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-4 inline-block">Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;