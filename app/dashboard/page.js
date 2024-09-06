"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css'; // Import the CSS module if used

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
          const token = localStorage.getItem('token');
          console.log('Fetching todos with token:', token); // Add this line
          const response = await fetch('http://localhost:5000/api/todos', {
              headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          console.log('Fetched Todos:', data); // Add this line
          setTodos(data); // Adjust if necessary
      } catch (error) {
          console.error('Error fetching todos:', error);
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

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        router.push('/login'); // Redirect to login page
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
            <h2 className={styles.todoListTitle}>Your Todos</h2>
            <ul className={styles.todoList}>
              {Array.isArray(todos) && todos.length > 0 ? (
              todos.map(todo => (
            <li key={todo._id} className={styles.todoItem}>
                <h3 className={styles.todoTitle}>{todo.title}</h3>
                <p className={styles.todoContent}>{todo.content}</p>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </li>
        ))
    ) : (
        <p>No todos available</p>
    )}
</ul>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default DashboardPage;
