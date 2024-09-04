"use client";

import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Link from 'next/link';
import styles from './page.module.css';

const TodoApp = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div className={styles.container}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add</button>
      <TodoList items={items} />
      <nav>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/login" className={styles.link}>Login</Link>
        <Link href="/register" className={styles.link}>Register</Link>
        <Link href="/create-post" className={styles.link}>Create Post</Link>
        <Link href="/posts" className={styles.link}>View Posts</Link>
      </nav>
    </div>
  );
};

export default TodoApp;
