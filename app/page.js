import React, { useState } from 'react';
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
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Link href="/another-page" className={styles.link}>
        Go to Another Page
      </Link>
    </div>
  );
};

export default TodoApp;
