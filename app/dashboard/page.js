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
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/todos', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTodos(data);
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
        <div style={styles.container}>
            <h1 style={styles.heading}>Dashboard</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>{editingTodo ? 'Edit Todo' : 'Create Todo'}</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    style={styles.input}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>
                    {editingTodo ? 'Update Todo' : 'Create Todo'}
                </button>
                {editingTodo && (
                    <button type="button" onClick={() => setEditingTodo(null)} style={styles.cancelButton}>
                        Cancel
                    </button>
                )}
            </form>
            <h2 style={styles.todoListTitle}>Your Todos</h2>
            <div style={styles.todoGrid}>
              {Array.isArray(todos) && todos.length > 0 ? (
                todos.map(todo => (
                    <div key={todo._id} style={styles.todoCard}>
                        <h3 style={styles.todoTitle}>{todo.title}</h3>
                        <p style={styles.todoContent}>{todo.content}</p>
                        <div style={styles.todoActions}>
                            <button onClick={() => handleEdit(todo)} style={styles.editButton}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(todo._id)} style={styles.deleteButton}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
              ) : (
                  <p>No todos available</p>
              )}
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f0f8ff',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'vertical',
    },
    button: {
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    cancelButton: {
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    editButton: {
        padding: '5px',
        margin: '0 5px',
        fontSize: '0.9rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        padding: '5px',
        margin: '0 5px',
        fontSize: '0.9rem',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    logoutButton: {
        marginTop: '1rem',
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    todoListTitle: {
        fontSize: '2rem',
        margin: '1rem 0',
    },
    todoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        width: '100%',
        maxWidth: '1200px',
    },
    todoCard: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ddd',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
    },
    todoTitle: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
    },
    todoContent: {
        fontSize: '1rem',
        marginBottom: '1rem',
    },
    todoActions: {
        marginTop: 'auto',
        display: 'flex',
        gap: '0.5rem',
    },
};

export default DashboardPage;
