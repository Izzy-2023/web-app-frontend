// pages/about.js
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div>
            <h1>About Page</h1>
            <p>This is the about page of the to-do list app.</p>
            <Link href="/">Go back to Home</Link>
        </div>
    );
};

export default AboutPage;
