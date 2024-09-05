"use client"; // Ensure this is here to enable client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/posts', { // Use the backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, author }),
            });
            const result = await response.json();
            if (response.ok) {
                router.push('/posts'); // Redirect to posts page after successful creation
            } else {
                alert(result.message || 'Post creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
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
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author ID"
                    required
                />
                <button type="submit">Create Post</button> 
                
            </form>
            
            
        </div>
        
    );
};

export default CreatePostPage;
