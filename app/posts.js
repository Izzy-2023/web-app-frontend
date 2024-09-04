import { useEffect, useState } from 'react';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>Author ID: {post.author}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;
