import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  content: string;
  images: string[];
  timestamp: Date;
  likes: number;
  comments: number;
}

interface PostStore {
  posts: Post[];
  addPost: (content: string, images: string[]) => void;
  likePost: (id: string) => void;
  commentPost: (id: string) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [],
      
      addPost: (content, images) => set((state) => ({
        posts: [{
          id: crypto.randomUUID(),
          content,
          images,
          timestamp: new Date(),
          likes: 0,
          comments: 0
        }, ...state.posts]
      })),
      
      likePost: (id) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      })),
      
      commentPost: (id) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, comments: post.comments + 1 } : post
        )
      }))
    }),
    {
      name: 'post-store'
    }
  )
);