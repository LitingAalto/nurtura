import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPost } = usePostStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const handlePost = () => {
    addPost(content, selectedImages);
    navigate('/mom');
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          Cancel
        </button>
        <h1 className="text-lg font-semibold">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!content.trim() && selectedImages.length === 0}
          className={`${
            content.trim() || selectedImages.length > 0
              ? 'text-pink-500'
              : 'text-gray-300'
          }`}
        >
          Post
        </button>
      </div>

      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 min-h-[200px] bg-white rounded-lg border-none resize-none"
        />

        {selectedImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center text-gray-600"
        >
          <span className="mr-2">📷</span>
          Add Photos
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;