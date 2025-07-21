// client/src/pages/PostDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../api';
import useApi from '../hooks/useApi';

function PostDetail() {
  const { slug } = useParams();
  const { data: post, loading, error, request: fetchPost } = useApi(postService.getPost);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug, fetchPost]);

  if (loading) return <div className="text-center text-lg">Loading post...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">Error: {error.message}</div>;
  if (!post) return <div className="text-center text-lg">Post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        By {post.author?.username || 'Unknown'} in {post.category?.name || 'Uncategorized'} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.featuredImage && (
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-80 object-cover mb-6 rounded-lg"
        />
      )}
      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>

      {/* Comments Section (Basic placeholder) */}
      <h2 className="text-2xl font-bold mb-4">Comments ({post.comments?.length || 0})</h2>
      {post.comments && post.comments.length > 0 ? (
        <div className="space-y-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">{comment.user?.username || 'Anonymous'}</p>
              <p className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</p>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {/* Add comment form will go here later */}
    </div>
  );
}

export default PostDetail;