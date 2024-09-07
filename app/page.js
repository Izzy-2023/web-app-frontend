// app/page.js
"use client";
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Us</h1>
            <p style={styles.text}>Welcome to our website! Here we offer a platform to manage your tasks effectively.</p>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleLogin}>Login</button>
                <button style={styles.button} onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default HomePage;
