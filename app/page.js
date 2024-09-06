// app/page.js
"use client"; // Add this at the top

import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login'); // Redirect to the login page
    };

    const handleRegister = () => {
        router.push('/register'); // Redirect to the registration page
    };

    return (
        <div>
            <h1>About Us</h1>
            <p>Welcome to our website! Here we offer a platform to manage your posts effectively.</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default HomePage;

