// client/src/pages/CreateEditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService, categoryService } from '../api';
import useApi from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

function CreateEditPost() {
  const { slug } = useParams(); // For editing existing posts
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    featuredImage: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: categories, request: fetchCategories } = useApi(categoryService.getAllCategories);
  const { data: postToEdit, request: fetchPostToEdit } = useApi(postService.getPost);
  const { loading: createLoading, error: createError, request: createPost } = useApi(postService.createPost);
  const { loading: updateLoading, error: updateError, request: updatePost } = useApi(postService.updatePost);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect if not logged in
    }
    fetchCategories();
  }, [user, navigate, fetchCategories]);

  useEffect(() => {
    if (slug) {
      setIsEditing(true);
      fetchPostToEdit(slug);
    } else {
      setIsEditing(false);
      setFormData({
        title: '',
        content: '',
        featuredImage: '',
        excerpt: '',
        category: '',
        tags: '',
        isPublished: false,
      });
    }
  }, [slug, fetchPostToEdit]);

  useEffect(() => {
    if (isEditing && postToEdit) {
      setFormData({
        title: postToEdit.title || '',
        content: postToEdit.content || '',
        featuredImage: postToEdit.featuredImage || '',
        excerpt: postToEdit.excerpt || '',
        category: postToEdit.category?._id || '', // Populate with category ID
        tags: postToEdit.tags?.join(', ') || '',
        isPublished: postToEdit.isPublished || false,
      });
    }
  }, [isEditing, postToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'tags') {
        data.append(key, formData[key].split(',').map(tag => tag.trim()));
      } else {
        data.append(key, formData[key]);
      }
    }
    if (imageFile) {
      data.append('featuredImage', imageFile);
    }

    try {
      let result;
      if (isEditing) {
        result = await updatePost(postToEdit._id, data);
      } else {
        result = await createPost(data);
      }
      if (result.success) {
        navigate(`/posts/${result.data.slug}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Error handling will be displayed by useApi hook or a global error context
    }
  };

  const loadingState = createLoading || updateLoading;
  const errorState = createError || updateError;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
      {errorState && <div className="text-red-500 text-center mb-4">{errorState.message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="featuredImage" className="block text-gray-700 font-semibold mb-2">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {formData.featuredImage && !imageFile && (
            <p className="text-sm text-gray-500 mt-2">Current image: {formData.featuredImage}</p>
          )}
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-gray-700 font-semibold mb-2">Excerpt (Optional)</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="200"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {Array.isArray(categories?.categories) ? categories.categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            )) : null}
          </select>
        </div>
        <div>
          <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isPublished" className="text-gray-700 font-semibold">Publish Post</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          disabled={loadingState}
        >
          {loadingState ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
}

export default CreateEditPost;