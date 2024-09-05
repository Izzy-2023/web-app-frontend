// app/page.js
import Link from 'next/link';
import styles from './page.module.css';

const TodoApp = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the New App</h1>
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
