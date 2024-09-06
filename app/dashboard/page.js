"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect to login if not authenticated
        } else {
            fetchTodos();
        }
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/todos', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            if (response.ok) {
                setTodos(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingTodo ? `http://localhost:5000/api/todos/${editingTodo._id}` : 'http://localhost:5000/api/todos';
        const method = editingTodo ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, content }),
            });
            const data = await response.json();
            if (response.ok) {
                if (editingTodo) {
                    setTodos(todos.map(todo => (todo._id === data._id ? data : todo)));
                    setEditingTodo(null);
                } else {
                    setTodos([...todos, data]);
                }
                setTitle('');
                setContent('');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (todo) => {
        setTitle(todo.title);
        setContent(todo.content);
        setEditingTodo(todo);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.ok) {
                setTodos(todos.filter(todo => todo._id !== id));
            } else {
                console.error(await response.json());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <h2>{editingTodo ? 'Edit Todo' : 'Create Todo'}</h2>
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
                <button type="submit">{editingTodo ? 'Update Todo' : 'Create Todo'}</button>
                {editingTodo && (
                    <button type="button" onClick={() => setEditingTodo(null)}>Cancel</button>
                )}
            </form>
            <h2>Your Todos</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.content}</p>
                        <button onClick={() => handleEdit(todo)}>Edit</button>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;


