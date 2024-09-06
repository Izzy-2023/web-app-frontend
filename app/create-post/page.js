"use client"; // Add this at the top

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, content }),
            });
            if (response.ok) {
                router.push('/dashboard'); // Redirect to dashboard after creating the post
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleCreatePost}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePostPage;
